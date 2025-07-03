import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { main } from "../assets/main";

const MainSection = styled.section`
  padding-top: 100px;
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    height: 400px;
  }

  @media screen and (max-width: 480px) {
    height: 300px;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  width: ${props => props.$totalSlides * 100}%;
  height: 100%;
  transform: translateX(-${props => props.$currentSlide * (100 / props.$totalSlides)}%);
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
`;


const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
`;

const NextButton = styled(NavButton)`
  right: 20px;
`;



const SlideOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 150px;
  padding-top: 30px;
`;  

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;

`;

const Des = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid #fff;
`;

const SecondButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border: 1px solid #000;
`;


const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % main.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + main.length) % main.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <MainSection>
      <SliderContainer>
        <SlideWrapper>
          <SlideContainer $currentSlide={currentSlide} $totalSlides={main.length}>
            {main.map((team, index) => (
              <Slide key={team.id}>
                <SlideImage 
                  src={team.img} 
                  alt={team.Team} 
                />
              </Slide>
            ))}
          </SlideContainer>
        </SlideWrapper>

        <PrevButton onClick={prevSlide} aria-label="Previous slide">
          <FaChevronLeft />
        </PrevButton>
        
        <NextButton onClick={nextSlide} aria-label="Next slide">
          <FaChevronRight />
        </NextButton>

      </SliderContainer>
        <SlideOverlay>
          <Title>LCK와 <br /> 함께하는 E-Sports</Title>
          <Des>
          <Subtitle>LCK는 최고의 팀과 선수들이 모인 리그입니다. <br /> 당신의 게임 여정을 함께하며 승리를 향해 나아가세요!</Subtitle>
          <ButtonContainer>
          <Button>자세히 보기</Button>
          <SecondButton>가입하기</SecondButton>
          </ButtonContainer>
          </Des>
        </SlideOverlay>
    </MainSection>
  );
};

export default Main;