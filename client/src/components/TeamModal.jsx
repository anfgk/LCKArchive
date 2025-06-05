import React from "react";
import styled from "styled-components";
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
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
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
  z-index: 1;

  @media screen and (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

const TeamImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const TeamInfo = styled.div`
  text-align: center;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }

    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const PlayersContainer = styled.div`
  margin-top: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 15px;
    margin-top: 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
    margin-top: 15px;
  }
`;

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 15px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const PlayerCard = styled.div`
  text-align: center;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;

    @media screen and (max-width: 480px) {
      font-size: 12px;
    }
  }

  p {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    word-break: break-all;

    @media screen and (max-width: 480px) {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

const RosterTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const TeamModal = ({ team, onClose }) => {
  if (!team) return null;

  const positions = [
    { key: "top", name: "탑" },
    { key: "jungle", name: "정글" },
    { key: "mid", name: "미드" },
    { key: "ad", name: "원딜" },
    { key: "support", name: "서포터" },
  ];

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
          <RosterTitle>2025 시즌 로스터</RosterTitle>
          <PlayersList>
            {positions.map((position) => (
              <PlayerCard key={position.key}>
                <h3>{position.name}</h3>
                <p>{currentTeamData[position.key]}</p>
              </PlayerCard>
            ))}
          </PlayersList>
        </PlayersContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default TeamModal;
