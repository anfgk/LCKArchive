import React from "react";
import styled from "styled-components";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.secondary};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About LCK.GG</h3>
          <p>리그 오브 레전드 전적 검색 및 프로게임 정보 제공</p>
        </FooterSection>
        <FooterSection>
          <h3>SNS</h3>
          <ul>
            <li>
              <a href="https://www.instagram.com/lckofficial">인스타그램</a>
            </li>
            <li>
              <a href="https://www.youtube.com/@LCK">유튜브</a>
            </li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <ul>
            <li>Email: support@lck.gg</li>
            <li>Discord: LCK.GG</li>
          </ul>
        </FooterSection>
      </FooterContent>
      <Copyright>© 2024 LCK.GG. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
