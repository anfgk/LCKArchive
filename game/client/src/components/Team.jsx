import React, { useState } from "react";
import { teams } from "../assets/team";
import styled from "styled-components";

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
  margin-top: 80px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 40px;
  color: #fff;
  font-size: 20px;
  margin: 50px 0;
  li {
    padding: 8px 16px;
    &:hover {
      padding: 8px 16px;
      border: 1px solid #fff;
      border-radius: 30px;
      cursor: pointer;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  align-items: center;
  gap: 100px;
`;

const TeamWrap = styled.div`
  border: 1px solid #a2a2a2;
  border-radius: 8px;
  width: 170px;
`;

const Img = styled.img`
  width: 100%;
  height: 100px;
  background: #fff;
  border-radius: 8px 8px 0 0;
  padding: 20px;
  object-fit: contain;
`;

const Member = styled.div`
  color: #fff;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Team = () => {
  const [category, setCategory] = useState("all");

  const filterTeams = (category) => {
    if (category === "all") {
      return teams;
    }
    return teams.filter((team) => team.category === category);
  };

  return (
    <Wrapper>
      <Inner>
        <Title>2025 LCK Team</Title>
        <Ul>
          <li onClick={() => setCategory("all")}>ALL</li>
          <li onClick={() => setCategory("baron")}>Group Baron</li>
          <li onClick={() => setCategory("elder")}>Group Elder</li>
        </Ul>
        <Container>
          {filterTeams(category).map((team) => (
            <div key={team.id}>
              <TeamWrap>
                <Img src={team.img} alt={team.team} />
                <h2>{team.Team}</h2>
                <Member>
                  <div>Top: {team.top}</div>
                  <div>Jungle: {team.jungle}</div>
                  <div>Mid: {team.mid}</div>
                  <div>AD: {team.ad}</div>
                  <div>Support: {team.support}</div>
                </Member>
              </TeamWrap>
            </div>
          ))}
        </Container>
      </Inner>
    </Wrapper>
  );
};

export default Team;
