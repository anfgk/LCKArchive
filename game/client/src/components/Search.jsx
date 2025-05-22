import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./Search.css";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const GameNameInput = styled(Input)`
  flex: 2;
`;

const TagLineInput = styled(Input)`
  flex: 1;
  min-width: 100px;
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PlayerInfoContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
  color: #fff;
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
`;

const PlayerName = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #aaa;
  }
`;

const RankInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const RankCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  p {
    margin: 0.5rem 0;
  }
`;

const MatchHistoryContainer = styled.div`
  margin-top: 2rem;
`;

const MatchHistoryHeader = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MatchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;

  .champion-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .champion-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .match-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .match-stats {
    display: flex;
    gap: 2rem;
  }

  .result {
    font-weight: bold;
    &.victory {
      color: #00bba3;
    }
    &.defeat {
      color: #ff4e50;
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

      // 플레이어 정보와 매치 히스토리를 동시에 가져오기
      const [playerResponse, matchesResponse] = await Promise.all([
        axios.get(
          `http://localhost:4000/api/player-data/${encodedGameName}/${encodedTagLine}`
        ),
        axios.get(
          `http://localhost:4000/api/matches/${encodedGameName}/${encodedTagLine}`
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
          <GameNameInput
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="게임 닉네임"
            required
          />
          <TagLineInput
            type="text"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            placeholder="태그 (예: KR1)"
            required
          />
        </InputGroup>
        <SearchButton type="submit" disabled={isLoading}>
          {isLoading ? "검색 중..." : "검색"}
        </SearchButton>
      </SearchForm>
      {error && <div className="error-message">{error}</div>}

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
            {playerData.rankInfo.map((rank, index) => (
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
            ))}
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
