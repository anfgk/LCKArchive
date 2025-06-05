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
  z-index: 1100;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const PlayerInfo = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;

  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #333;
  }

  h3 {
    font-size: 20px;
    color: #666;
    margin-bottom: 10px;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;

  h4 {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }
`;

const PlayerPosition = styled.div`
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  margin: 10px 0;
  font-weight: bold;
`;

const TeamLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 20px 0;
`;

const PlayerModal = ({ playerNickname, onClose }) => {
  // 선수가 속한 팀 찾기
  const teamData = player.find((team) =>
    Object.values(team).includes(playerNickname)
  );

  if (!teamData) return null;

  // 선수의 포지션 찾기
  const position = Object.entries(teamData).find(
    ([key, value]) =>
      value === playerNickname &&
      ["top", "jungle", "mid", "ad", "support"].includes(key)
  );

  const positionNames = {
    top: "탑",
    jungle: "정글",
    mid: "미드",
    ad: "원딜",
    support: "서포터",
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <PlayerInfo>
          <h2>{playerNickname}</h2>
          <PlayerPosition>{positionNames[position[0]]}</PlayerPosition>
        </PlayerInfo>
        <TeamLogo src={teamData.img} alt={teamData.Team} />
        <InfoSection>
          <h4>소속팀</h4>
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {teamData.Team}
          </p>
        </InfoSection>
      </ModalContent>
    </ModalBackground>
  );
};

export default PlayerModal;
