import React from "react";
import styled from "styled-components";
import logo from "../../public/img/logo.svg";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 2rem 0;
  margin-top: 4rem;
`;

const Photo = styled.div`
  img {
    width: 60px;
    height: 60px;
    margin-left: 170px;
    transition: transform 0.3s ease;
    @media screen and (max-width: 390px) {
      width: 100px;
    }
  }
  img:hover {
    transform: scale(1.1); /* 확대 효과 */
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  gap: 10px;
`;

const FooterText = styled.div`
  display: flex;
  gap: 10px;
  text-decoration: underline;
  padding-top: 60px;
  margin-left: 173px;
`;

const Footer = () => {
  return (
    <FooterContainer>
        <Photo>
          <a href="/Main">
            {/* 로고 클릭 시 메인 페이지로 이동 */}
            <img src={logo} alt="Logo" />
          </a>
        </Photo>
      <FooterContent>
        <FooterSection>
          <li>팀 소개</li>
          <li>대회 일정</li>
          <li>커뮤니티</li>
        </FooterSection>
      </FooterContent>
      <FooterText>
        <li>개인정보 처리방침</li>
        <li>서비스 이용약관</li>
        <li>고객센터</li>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
