import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaYoutube, FaSyncAlt } from "react-icons/fa";

const FooterBg = styled.footer`
  width: 100vw;
  min-height: 320px;
  background: #111;
  color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
const FooterContent = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0 32px 0;
`;
const FooterLogo = styled.div`
  font-family: 'Montserrat', 'Pretendard', sans-serif;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 18px;
`;
const FooterSNS = styled.div`
  display: flex;
  gap: 28px;
  margin: 24px 0 18px 0;
`;
const SNSIcon = styled.a`
  color: #fff;
  background: #222;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background 0.2s;
  &:hover { background: #4ee1a0; color: #111; }
`;
const FooterLang = styled.button`
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  border-radius: 22px;
  padding: 6px 22px;
  font-size: 1.1rem;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover { background: #fff; color: #111; }
`;
const FooterCopyright = styled.div`
  font-size: 0.98rem;
  color: #aaa;
  margin-top: 18px;
`;
const VisitBtn = styled.a`
  position: absolute;
  left: 32px;
  bottom: 32px;
  background: #fff;
  color: #111;
  border-radius: 16px;
  padding: 12px 22px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, color 0.2s;
  &:hover { background: #007bff; color: #111; }
`;
const RefreshBtn = styled.button`
  position: absolute;
  right: 32px;
  bottom: 32px;
  background: #fff;
  color: #111;
  border-radius: 16px;
  width: 48px;
  height: 48px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;
  &:hover { background: #007bff; color: #111; }
`;

const Footer = () => {
  return (
    <FooterBg>
      <FooterContent>
        <FooterLogo>LCK.GG</FooterLogo>
        <FooterSNS>
          <SNSIcon href="#" aria-label="페이스북"><FaFacebookF /></SNSIcon>
          <SNSIcon href="#" aria-label="인스타그램"><FaInstagram /></SNSIcon>
          <SNSIcon href="#" aria-label="트위터"><FaTwitter /></SNSIcon>
          <SNSIcon href="#" aria-label="이메일"><FaEnvelope /></SNSIcon>
          <SNSIcon href="#" aria-label="유튜브"><FaYoutube /></SNSIcon>
        <FooterLang>한국어</FooterLang>
        </FooterSNS>
        <FooterCopyright>Copyright © LCK.GG, Inc.</FooterCopyright>
      </FooterContent>
      <VisitBtn href="https://lolesports.com" target="_blank" rel="noopener noreferrer">↗ 사이트 방문</VisitBtn>
      <RefreshBtn onClick={()=>window.location.reload()}><FaSyncAlt /></RefreshBtn>
    </FooterBg>
  );
};

export default Footer;
