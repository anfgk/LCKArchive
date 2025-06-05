import React, { useState } from "react";
import styled from "styled-components";
import PlayerModal from "./PlayerModal";
import { player } from "../assets/player";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const TeamImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

const TeamInfo = styled.div`
  text-align: center;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }
`;

const PlayersContainer = styled.div`
  margin-top: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
`;

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 15px;
`;

const PlayerCard = styled.div`
  text-align: center;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
`;

const TeamModal = ({ team, onClose }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  if (!team) return null;

  const positions = [
    { key: "top", name: "탑" },
    { key: "jungle", name: "정글" },
    { key: "mid", name: "미드" },
    { key: "ad", name: "원딜" },
    { key: "support", name: "서포터" },
  ];

  const handlePlayerClick = (playerNickname) => {
    setSelectedPlayer(playerNickname);
  };

  const handlePlayerModalClose = () => {
    setSelectedPlayer(null);
  };

  // 현재 팀의 정보를 player 배열에서 찾기
  const currentTeamData = player.find((t) => t.Team === team.Team);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <TeamImage src={currentTeamData.img} alt={currentTeamData.Team} />
        <TeamInfo>
          <h2>{currentTeamData.Team}</h2>
        </TeamInfo>
        <PlayersContainer>
          <h3
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            2025 시즌 로스터
          </h3>
          <PlayersList>
            {positions.map((position) => (
              <PlayerCard
                key={position.key}
                onClick={() => handlePlayerClick(currentTeamData[position.key])}
              >
                <h3>{position.name}</h3>
                <p>{currentTeamData[position.key]}</p>
              </PlayerCard>
            ))}
          </PlayersList>
        </PlayersContainer>
        {selectedPlayer && (
          <PlayerModal
            playerNickname={selectedPlayer}
            onClose={handlePlayerModalClose}
          />
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default TeamModal;
