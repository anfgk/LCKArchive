import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Main from "./components/Main";
import Team from "./components/Team";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Champion from "./components/Champion";

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --primary-color: ${(props) => props.theme.colors.primary};
    --secondary-color: ${(props) => props.theme.colors.secondary};
    --background-color: ${(props) => props.theme.colors.background};
    --text-color: ${(props) => props.theme.colors.text};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  body {
    min-height: 100vh;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main />
      <section id="team-section">
        <Team />
      </section>
      <section id="champion-section">
        <Champion />
      </section>
      <section
        id="search-section"
        style={{
          padding: "40px 0",
        }}
      >
        <Search />
      </section>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
