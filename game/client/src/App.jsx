import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Header from "./components/Header";
import Main from "./components/Main";
import Team from "./components/Team";
import Youtube from "./components/GameData";

const GlobalStyle = createGlobalStyle`
  ${reset} // styled-reset을 통해 CSS 리셋 적용



  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  body {
    min-height: 100vh;  // 콘텐츠가 길어질 때도 화면에 맞춰지도록 변경
    background: #111;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
      <Team />
      <Youtube />
    </>
  );
}

export default App;
