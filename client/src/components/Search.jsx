import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./Search.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  width: 200px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 1rem;
`;

const PlayerInfoContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
`;

const PlayerName = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const RankInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const RankCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    margin: 0.8rem 0;
    font-size: 1.1rem;
  }
`;

const MatchHistoryContainer = styled.div`
  margin-top: 3rem;
`;

const MatchHistoryHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MatchCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.08);
  }

  .champion-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .champion-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  .match-details {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .match-stats {
    display: flex;
    gap: 2rem;
    font-size: 1.1rem;
  }

  .result {
    font-size: 1.2rem;
    font-weight: bold;
    &.victory {
      color: ${(props) => props.theme.colors.success};
    }
    &.defeat {
      color: ${(props) => props.theme.colors.error};
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;

    .champion-info {
      justify-content: center;
    }

    .match-stats {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const Search = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPlayerData(null);
    setMatchHistory([]);

    try {
      const encodedGameName = encodeURIComponent(gameName.trim());
      const encodedTagLine = encodeURIComponent(tagLine.trim());

      const [playerResponse, matchesResponse] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/api/player-data/${encodedGameName}/${encodedTagLine}`
        ),
        axios.get(
          `${API_BASE_URL}/api/matches/${encodedGameName}/${encodedTagLine}`
        ),
      ]);

      setPlayerData(playerResponse.data);
      setMatchHistory(matchesResponse.data.matches);
    } catch (error) {
      console.error("Search error:", error.response || error);
      if (error.response) {
        const errorData = error.response.data;
        setError(
          <div>
            <p>{errorData.message}</p>
            {errorData.retryAfter && (
              <p className="retry-message">{errorData.retryAfter}</p>
            )}
          </div>
        );
      } else {
        setError(
          "서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatGameDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="게임 닉네임"
            required
          />
          <Input
            type="text"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            placeholder="태그 (예: KR1)"
            required
          />
        </InputGroup>
        <SearchButton type="submit" disabled={isLoading}>
          {isLoading ? "검색 중..." : "전적 검색"}
        </SearchButton>
      </SearchForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {playerData && (
        <PlayerInfoContainer>
          <PlayerHeader>
            <ProfileIcon
              src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${playerData.summoner.profileIconId}.png`}
              alt="Profile Icon"
            />
            <PlayerName>
              <h2>{playerData.account.gameName}</h2>
              <p>레벨 {playerData.summoner.summonerLevel}</p>
            </PlayerName>
          </PlayerHeader>

          <RankInfo>
            {playerData.rankInfo && playerData.rankInfo.length > 0 ? (
              playerData.rankInfo.map((rank, index) => (
              <RankCard key={index}>
                <h3>
                  {rank.queueType === "RANKED_SOLO_5x5"
                    ? "솔로 랭크"
                    : "자유 랭크"}
                </h3>
                <p>
                  티어: {rank.tier} {rank.rank}
                </p>
                <p>리그 포인트: {rank.leaguePoints}LP</p>
                <p>
                  승/패: {rank.wins}승 {rank.losses}패
                </p>
                <p>
                  승률:{" "}
                  {((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1)}%
                </p>
              </RankCard>
              ))
            ) : (
              <RankCard>
                <h3>랭크 정보</h3>
                <p>랭크 정보를 가져올 수 없습니다.</p>
                <p>API 권한 문제로 인해 랭크 정보를 표시할 수 없습니다.</p>
              </RankCard>
            )}
          </RankInfo>

          <MatchHistoryContainer>
            <MatchHistoryHeader>최근 전적</MatchHistoryHeader>
            <MatchList>
              {matchHistory.map((match, index) => (
                <MatchCard key={index}>
                  <div className="champion-info">
                    <img
                      className="champion-icon"
                      src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.championName}.png`}
                      alt={match.championName}
                    />
                    <div>{match.championName}</div>
                  </div>
                  <div className="match-details">
                    <div
                      className={`result ${match.win ? "victory" : "defeat"}`}
                    >
                      {match.win ? "승리" : "패배"}
                    </div>
                    <div className="match-stats">
                      <span>
                        {match.kills}/{match.deaths}/{match.assists}
                      </span>
                      <span>
                        KDA:{" "}
                        {(
                          (match.kills + match.assists) /
                          Math.max(1, match.deaths)
                        ).toFixed(2)}
                      </span>
                      <span>CS: {match.totalMinionsKilled}</span>
                      <span>
                        게임 시간: {formatGameDuration(match.gameDuration)}
                      </span>
                    </div>
                  </div>
                </MatchCard>
              ))}
            </MatchList>
          </MatchHistoryContainer>
        </PlayerInfoContainer>
      )}
    </SearchContainer>
  );
};

export default Search;