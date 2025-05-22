require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

if (!RIOT_API_KEY) {
  console.error("RIOT_API_KEY is not defined in environment variables");
  process.exit(1);
}

console.log("Using API Key:", RIOT_API_KEY); // API 키 확인

// CORS 설정
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-domain.vercel.app"] // 배포 후 실제 도메인으로 변경
      : ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

// Riot API 기본 URL
const RIOT_API_ASIA = "https://asia.api.riotgames.com";
const RIOT_API_KR = "https://kr.api.riotgames.com";

// API 요청을 위한 헤더
const riotHeaders = {
  headers: {
    "X-Riot-Token": RIOT_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  },
};

// 계정 정보 조회
app.get("/api/account/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;

  if (!gameName || !tagLine) {
    return res
      .status(400)
      .json({ message: "게임 이름과 태그라인이 필요합니다." });
  }

  try {
    const response = await axios.get(
      `${RIOT_API_ASIA}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      riotHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleApiError(error, res);
  }
});

// 소환사 정보 조회
app.get("/api/summoner/:puuid", async (req, res) => {
  const { puuid } = req.params;

  try {
    const response = await axios.get(
      `${RIOT_API_KR}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      riotHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleApiError(error, res);
  }
});

// 랭크 정보 조회
app.get("/api/league/:summonerId", async (req, res) => {
  const { summonerId } = req.params;

  try {
    const response = await axios.get(
      `${RIOT_API_KR}/lol/league/v4/entries/by-summoner/${summonerId}`,
      riotHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleApiError(error, res);
  }
});

// 매치 히스토리 조회
app.get("/api/matches/:puuid", async (req, res) => {
  const { puuid } = req.params;
  const count = req.query.count || 10; // 기본값 10개

  try {
    const response = await axios.get(
      `${RIOT_API_ASIA}/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
      riotHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleApiError(error, res);
  }
});

// 매치 상세 정보 조회
app.get("/api/match/:matchId", async (req, res) => {
  const { matchId } = req.params;

  try {
    const response = await axios.get(
      `${RIOT_API_ASIA}/lol/match/v5/matches/${matchId}`,
      riotHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleApiError(error, res);
  }
});

// 통합 데이터 조회 (한 번의 요청으로 모든 정보 가져오기)
app.get("/api/player-data/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;

  console.log("\n=== 새로운 검색 요청 ===");
  console.log("검색 정보:", { gameName, tagLine });
  console.log("API Key:", RIOT_API_KEY);
  console.log("Headers:", riotHeaders);

  try {
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

    // 3. 랭크 정보 조회
    const rankUrl = `${RIOT_API_KR}/lol/league/v4/entries/by-summoner/${summonerId}`;
    console.log("\n3. 랭크 정보 요청 URL:", rankUrl);

    const rankResponse = await axios.get(rankUrl, riotHeaders);
    console.log("랭크 정보 응답:", rankResponse.data);

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
});

// 통합 매치 데이터 조회
app.get("/api/matches/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;

  try {
    // 1. 계정 정보로 PUUID 조회
    const accountResponse = await axios.get(
      `${RIOT_API_ASIA}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}`,
      riotHeaders
    );
    const puuid = accountResponse.data.puuid;

    // 2. 최근 매치 목록 조회
    const matchListResponse = await axios.get(
      `${RIOT_API_ASIA}/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5`,
      riotHeaders
    );
    const matchIds = matchListResponse.data;

    // 3. 각 매치의 상세 정보 조회
    const matchDetailsPromises = matchIds.map((matchId) =>
      axios.get(`${RIOT_API_ASIA}/lol/match/v5/matches/${matchId}`, riotHeaders)
    );

    const matchResponses = await Promise.all(matchDetailsPromises);

    // 4. 플레이어의 매치 데이터 추출 및 가공
    const matches = matchResponses.map((response) => {
      const match = response.data;
      const participant = match.info.participants.find(
        (p) => p.puuid === puuid
      );

      return {
        gameId: match.info.gameId,
        gameDuration: match.info.gameDuration,
        gameEndTimestamp: match.info.gameEndTimestamp,
        championName: participant.championName,
        champLevel: participant.champLevel,
        kills: participant.kills,
        deaths: participant.deaths,
        assists: participant.assists,
        win: participant.win,
        totalMinionsKilled: participant.totalMinionsKilled,
        visionScore: participant.visionScore,
        summoner1Id: participant.summoner1Id,
        summoner2Id: participant.summoner2Id,
        item0: participant.item0,
        item1: participant.item1,
        item2: participant.item2,
        item3: participant.item3,
        item4: participant.item4,
        item5: participant.item5,
        item6: participant.item6,
      };
    });

    res.json({ matches });
  } catch (error) {
    handleApiError(error, res);
  }
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
          message:
            "플레이어를 찾을 수 없습니다. 닉네임과 태그를 다시 확인해주세요.",
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
          message:
            "Riot Games 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
        });
      case 503:
        return res.status(503).json({
          message:
            "Riot Games 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
          details: errorData,
        });
      default:
        console.error(`Unexpected API Error:`, error.response);
        return res.status(500).json({
          message:
            "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
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

app.use((req, res) => {
  res.status(404).json({ message: "요청하신 경로를 찾을 수 없습니다." });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
