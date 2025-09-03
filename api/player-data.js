const axios = require('axios');

// Riot API 기본 URL
const RIOT_API_ASIA = "https://asia.api.riotgames.com";
const RIOT_API_KR = "https://kr.api.riotgames.com";

// API 요청을 위한 헤더
const getRiotHeaders = () => ({
  headers: {
    "X-Riot-Token": process.env.RIOT_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  },
});

// API 에러 처리 함수
function handleApiError(error, res) {
  if (error.response) {
    const status = error.response.status;
    const errorData = error.response.data;

    console.error("API Error Details:", {
      status,
      data: errorData,
      headers: error.response.headers,
      url: error.config.url,
    });

    switch (status) {
      case 400:
        return res.status(400).json({
          message: "잘못된 요청입니다. 게임 닉네임과 태그를 확인해주세요.",
          details: errorData,
        });
      case 401:
        return res.status(401).json({
          message: "API 키가 만료되었습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
          retryAfter: "24시간 후에 다시 시도해주세요.",
        });
      case 403:
        return res.status(403).json({
          message: "API 접근이 거부되었습니다. 관리자에게 문의해주세요.",
          details: errorData,
        });
      case 404:
        return res.status(404).json({
          message: "플레이어를 찾을 수 없습니다. 닉네임과 태그를 다시 확인해주세요.",
          details: errorData,
        });
      case 429:
        const retryAfter = error.response.headers["retry-after"] || "120";
        return res.status(429).json({
          message: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
          retryAfter: `${retryAfter}초 후에 다시 시도해주세요.`,
        });
      case 500:
        return res.status(500).json({
          message: "Riot Games 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
        });
      case 503:
        return res.status(503).json({
          message: "Riot Games 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
        });
      default:
        console.error(`Unexpected API Error:`, error.response);
        return res.status(500).json({
          message: "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
        });
    }
  }

  // 네트워크 오류 등 response가 없는 경우
  console.error("Server Error:", error);
  res.status(500).json({
    message: "서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    error: error.message,
  });
}

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { gameName, tagLine } = req.query;

  if (!gameName || !tagLine) {
    return res.status(400).json({ message: "게임 이름과 태그라인이 필요합니다." });
  }

  if (!process.env.RIOT_API_KEY) {
    console.error("RIOT_API_KEY is not defined in environment variables");
    return res.status(500).json({ message: "서버 설정 오류" });
  }

  console.log("\n=== 새로운 검색 요청 ===");
  console.log("검색 정보:", { gameName, tagLine });

  try {
    const riotHeaders = getRiotHeaders();

    // 1. 계정 정보 조회
    const accountUrl = `${RIOT_API_ASIA}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`;
    console.log("\n1. 계정 정보 요청 URL:", accountUrl);

    const accountResponse = await axios.get(accountUrl, riotHeaders);
    console.log("계정 정보 응답:", accountResponse.data);

    const { puuid } = accountResponse.data;

    // 2. 소환사 정보 조회
    const summonerUrl = `${RIOT_API_KR}/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    console.log("\n2. 소환사 정보 요청 URL:", summonerUrl);

    const summonerResponse = await axios.get(summonerUrl, riotHeaders);
    console.log("소환사 정보 응답:", summonerResponse.data);

    const { id: summonerId } = summonerResponse.data;

    // 3. 랭크 정보 조회 (임시 비활성화 - 403 에러 방지)
    console.log("\n3. 랭크 정보 요청 건너뛰기 (403 에러 방지)");
    let rankResponse;
    try {
      const rankUrl = `${RIOT_API_KR}/lol/league/v4/entries/by-summoner/${summonerId}`;
      console.log("랭크 정보 요청 URL:", rankUrl);
      rankResponse = await axios.get(rankUrl, riotHeaders);
      console.log("랭크 정보 응답:", rankResponse.data);
    } catch (rankError) {
      console.log("랭크 정보 조회 실패, 빈 배열로 설정:", rankError.response?.status);
      rankResponse = { data: [] };
    }

    // 4. 최근 매치 목록 조회
    const matchListUrl = `${RIOT_API_ASIA}/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5`;
    console.log("\n4. 매치 목록 요청 URL:", matchListUrl);

    const matchListResponse = await axios.get(matchListUrl, riotHeaders);
    console.log("매치 목록 응답:", matchListResponse.data);

    // 5. 데이터 종합
    const playerData = {
      account: accountResponse.data,
      summoner: summonerResponse.data,
      rankInfo: rankResponse.data,
      recentMatches: matchListResponse.data,
    };

    console.log("\n=== 검색 완료 ===");
    res.json(playerData);
  } catch (error) {
    console.error("\n=== 에러 발생 ===");
    if (error.response) {
      console.error("에러 상태:", error.response.status);
      console.error("에러 데이터:", error.response.data);
      console.error("에러 헤더:", error.response.headers);
      console.error("요청 설정:", {
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers,
      });
    } else {
      console.error("에러 정보:", error.message);
    }
    handleApiError(error, res);
  }
};
