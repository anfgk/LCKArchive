import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  flex: 1;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const MatchList = styled.div`
  display: grid;
  gap: 20px;
`;

const MatchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  display: grid;
  gap: 10px;
`;

const GameData = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. 계정 정보 조회
      const accountResponse = await axios.get(
        `${API_BASE_URL}/api/account/${encodeURIComponent(
          gameName
        )}/${encodeURIComponent(tagLine)}`
      );
      const { puuid } = accountResponse.data;

      // 2. 소환사 정보 조회
      const summonerResponse = await axios.get(
        `${API_BASE_URL}/api/summoner/${puuid}`
      );

      // 3. 최근 매치 목록 조회
      const matchesResponse = await axios.get(
        `${API_BASE_URL}/api/matches/${puuid}?count=5`
      );

      // 4. 각 매치의 상세 정보 조회
      const matchDetails = await Promise.all(
        matchesResponse.data.map((matchId) =>
          axios
            .get(`${API_BASE_URL}/api/match/${matchId}`)
            .then((response) => response.data)
        )
      );

      setMatches(matchDetails);
    } catch (error) {
      console.error("API Error:", error);
      setError(
        error.response?.data?.message || "데이터를 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatGameDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}분 ${seconds}초`;
  };

  return (
    <Container>
      <h2>게임 전적 검색</h2>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="게임 닉네임"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="태그라인 (예: KR1)"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </Button>
      </SearchForm>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <MatchList>
        {matches.map((match, index) => (
          <MatchCard key={match.metadata.matchId}>
            <h3>매치 {index + 1}</h3>
            <p>게임 시간: {formatGameDuration(match.info.gameDuration)}</p>
            <p>게임 모드: {match.info.gameMode}</p>
            <p>플레이어 수: {match.metadata.participants.length}</p>
          </MatchCard>
        ))}
      </MatchList>
    </Container>
  );
};

export default GameData;
