import React, { useState } from "react";
import { teams } from "../assets/team"; // 팀 데이터 불러오기 (배열 형태로 이미지와 이름 포함)
import styled from "styled-components";
import TeamModal from "./TeamModal";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

const Inner = styled.div`
  max-width: 1200px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  margin: 80px 0;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 36px;
    margin: 60px 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 28px;
    margin: 40px 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const TeamWrap = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 768px) {
    padding: 15px;

    h2 {
      font-size: 14px;
      margin-top: 12px;
    }
  }
`;

const ImgContainer = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.1);
  transition: transform 0.3s ease;

  ${TeamWrap}:hover & {
    transform: scale(1.1);
  }
`;

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  return (
    <Wrapper>
      <Inner>
        <Title>2025 LCK 참가팀</Title>
        <Container>
          {teams.map((team) => (
            <TeamWrap key={team.id} onClick={() => handleTeamClick(team)}>
              <ImgContainer>
                <Img src={team.img} alt={team.team} />
              </ImgContainer>
              <h2>{team.Team}</h2>
            </TeamWrap>
          ))}
        </Container>
        {selectedTeam && (
          <TeamModal team={selectedTeam} onClose={handleCloseModal} />
        )}
      </Inner>
    </Wrapper>
  );
};

export default Team;