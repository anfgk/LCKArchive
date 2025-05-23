import React from "react";
import styled from "styled-components";

const MainSection = styled.section`
  padding-top: 60px;
`;

const VideoWrapper = styled.div`
  video {
    width: 100%;
    height: auto;
  }
`;

const Main = () => {
  return (
    <MainSection>
      <VideoWrapper>
        <video autoPlay loop muted>
          <source src="/videos/lck.mp4" type="video/mp4" />
        </video>
      </VideoWrapper>
    </MainSection>
  );
};

export default Main;
