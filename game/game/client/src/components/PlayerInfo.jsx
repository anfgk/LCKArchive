import React from "react";
import styled from "styled-components";

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

const MatchHistory = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const PlayerInfo = ({ playerData }) => {
  const { account, summoner, rankInfo, recentMatches } = playerData;

  return (
    <PlayerInfoContainer>
      <PlayerHeader>
        <ProfileIcon
          src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${summoner.profileIconId}.png`}
          alt="Profile Icon"
        />
        <PlayerName>
          <h2>{account.gameName}</h2>
          <p>레벨 {summoner.summonerLevel}</p>
        </PlayerName>
      </PlayerHeader>

      <RankInfo>
        {rankInfo.map((rank, index) => (
          <RankCard key={index}>
            <h3>
              {rank.queueType === "RANKED_SOLO_5x5" ? "솔로 랭크" : "자유 랭크"}
            </h3>
            <p>
              티어: {rank.tier} {rank.rank}
            </p>
            <p>리그 포인트: {rank.leaguePoints}LP</p>
            <p>
              승/패: {rank.wins}승 {rank.losses}패
            </p>
            <p>
              승률: {((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1)}
              %
            </p>
          </RankCard>
        ))}
      </RankInfo>

      <MatchHistory>
        <h3>최근 게임</h3>
        <p>최근 {recentMatches.length}개의 게임</p>
        {/* 매치 상세 정보는 필요에 따라 추가 구현 */}
      </MatchHistory>
    </PlayerInfoContainer>
  );
};

export default PlayerInfo;
