import React from "react";
import styled from "styled-components";

const MainBg = styled.div`
  min-height: 100vh;
  background: #111;
  color: #fff;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0 0 0;
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;
  li {
    font-size: 1.1rem;
    font-weight: 500;
    opacity: 0.85;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    transition: border 0.2s, color 0.2s;
  }
  .active {
    color: #fff;
    border-bottom: 2px solid #fff;
    opacity: 1;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 20px 0;
`;

const MainTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 18px;
`;

const MainTitleAccent = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #4ee1a0 30%, #1fa2ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const SubText = styled.div`
  font-size: 1.15rem;
  color: #bbb;
  text-align: center;
  max-width: 600px;
`;

const SlideWrap = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #181818;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 24px rgba(0,0,0,0.25);
  position: relative;
`;

const SlideVideo = styled.video`
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
`;

const Main = () => {
  // Team 섹션으로 스크롤하는 함수
  const handleScrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainBg>
      <Nav>
        <Logo>LCK.GG</Logo>
        <Menu>
          <li className="active">홈</li>
          <li onClick={handleScrollToTeam} style={{cursor:'pointer'}}>팀</li>
          <li>일정</li>
          <li>챔피언</li>
          <li>커뮤니티</li>
        </Menu>
      </Nav>
      <Center>
        <MainTitle>
          LCK의 <MainTitleAccent>모든 순간</MainTitleAccent>을<br />
          경험하세요
        </MainTitle>
        <SubText>
          최고의 팀과 선수들이 펼치는 감동의 무대, 지금 바로 함께하세요.<br />
          당신의 게임 여정에 LCK가 함께합니다.
        </SubText>
      </Center>
      <SlideWrap>
        <SlideVideo
          src="/videos/lck.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </SlideWrap>
    </MainBg>
  );
};

export default Main;