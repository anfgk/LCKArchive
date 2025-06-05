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
`;

const Inner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  margin: 80px 0;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  align-items: center;
  gap: 100px;
`;

const TeamWrap = styled.div`
  width: 170px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;

  h2 {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  padding: 10px;
  background-color: transparent;
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
        {/* 팀 리스트를 담는 그리드 컨테이너 */}
        <Container>
          {teams.map((team) => (
            // 각 팀 정보를 표시하는 박스, key는 고유 식별자인 team.id 사용
            <div key={team.id}>
              <TeamWrap onClick={() => handleTeamClick(team)}>
                <Img src={team.img} alt={team.team} />
                <h2>{team.Team}</h2>
              </TeamWrap>
            </div>
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
