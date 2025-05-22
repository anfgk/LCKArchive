import React from "react";
import styled from "styled-components";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Wrapper = styled.footer`
  width: 100%;
  background: #1c1c1c;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;

  img {
    width: 100px;
    height: auto;
  }
`;

const LinkList = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Logo>
          <img src="/img/lck.svg" alt="LCK Logo" />
        </Logo>
        <LinkList>
          <li>
            <StyledLink
              href="https://www.instagram.com/lckofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram /> Instagram
            </StyledLink>
          </li>
          <li>
            <StyledLink
              href="https://www.youtube.com/@LCK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube /> YouTube
            </StyledLink>
          </li>
        </LinkList>
      </Container>
    </Wrapper>
  );
};

export default Footer;
