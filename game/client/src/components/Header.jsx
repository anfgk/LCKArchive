import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../public/img/logo.svg";

const HeaderWrap = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  background: #111;
  display: flex;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  gap: 40px;
  padding-left: 50px;

  @media screen and (max-width: 390px) {
    padding-left: 20px;
  }
`;

const Photo = styled.div`
  img {
    width: 120px;
    transition: transform 0.3s ease;
    @media screen and (max-width: 390px) {
      width: 100px;
    }
  }
  img:hover {
    transform: scale(1.1); /* 확대 효과 */
  }
`;

const Ul = styled.ul`
  display: flex;
  gap: 30px;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  li {
    cursor: pointer;
    &:hover {
      color: #f00;
    }
  }

  @media screen and (max-width: 390px) {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 10%;
    right: 0;
    background: rgb(17, 17, 17);
    width: 50%;
    height: 60vh;
    justify-content: center;
    align-items: center;
    color: white;
    li {
      margin: 20px 0;
      font-size: 22px;
    }
  }

  &.active {
    display: flex;
  }
`;

const MenuButton = styled.button`
  display: none;
  font-size: 25px;
  color: white; /* 버튼 텍스트 색상 흰색으로 설정 */
  cursor: pointer;
  background: none;
  border: none;
  @media screen and (max-width: 390px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 메뉴 열림/닫힘 상태 변경
  };

  return (
    <HeaderWrap>
      <Nav>
        <Photo>
          <a href="/Main">
            <img src={logo} alt="Logo" />
          </a>
        </Photo>
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? "X" : "☰"} {/* 메뉴 버튼: 열렸을 때 "X"로 변경 */}
        </MenuButton>
        <Ul className={isMenuOpen ? "active" : ""}>
          <li>
            <a href="https://www.leagueoflegends.com/ko-kr/how-to-play/">
              게임정보
            </a>
          </li>
          <li>LCK 팀</li>
          <li>
            <a href="">Game ID</a>
          </li>
          <li>
            <a href="https://www.leagueoflegends.com/ko-kr/news/tags/patch-notes/">
              패치노트
            </a>
          </li>
        </Ul>
      </Nav>
    </HeaderWrap>
  );
};

export default Header;
