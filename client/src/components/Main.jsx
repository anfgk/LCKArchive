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
  height: 80vh;
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
  width: ${props => props.totalSlides * 100}%;
  height: 100%;
  transform: translateX(-${props => props.currentSlide * (100 / props.totalSlides)}%);
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  width: ${props => 100 / props.totalSlides}%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
`;

const SlideOverlay = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  color: white;
  padding: 20px;
  text-align: center;
`;

const SlideTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
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

const Indicators = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Indicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
    transform: scale(1.2);
  }
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
          <SlideContainer currentSlide={currentSlide} totalSlides={main.length}>
            {main.map((team, index) => (
              <Slide key={team.id} totalSlides={main.length}>
                <SlideImage 
                  src={team.img} 
                  alt={team.Team} 
                />
                <SlideOverlay>
                  <SlideTitle>{team.Team}</SlideTitle>
                </SlideOverlay>
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

        <Indicators>
          {main.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentSlide}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Indicators>
      </SliderContainer>
    </MainSection>
  );
};

export default Main;
