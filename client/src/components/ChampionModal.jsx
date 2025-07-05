import React from "react";
import styled from "styled-components";

const ModalBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #222;
  color: #fff;
  border-radius: 18px;
  padding: 28px 18px 24px 18px;
  min-width: 320px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  position: relative;
`;
const ModalTop = styled.div`
  display: flex;
  gap: 28px;
  margin-bottom: 18px;
`;
const ModalImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 12px;
  object-fit: cover;
`;
const ModalInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const ModalNameBox = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  border-radius: 6px;
`;
const ModalTitleBox = styled.div`
  color: #007bff;
  font-size: 1.1rem;
`;
const ModalBlurbBox = styled.div`
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
`;
const ModalSkills = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;

`;
const SkillBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`;
const SkillImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #111;
  margin-bottom: 4px;
`;
const SkillKey = styled.div`
  font-weight: 700;
  color: #4ee1a0;
  font-size: 1.1rem;
`;
const SkillName = styled.div`
  font-size: 0.98rem;
  color: #fff;
  text-align: center;
`;
const SkillDesc = styled.div`
  font-size: 0.92rem;
  color: #fff;
  width: 50%;
  text-align: center;
  margin-top: 2px;
`;
const ModalClose = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;
const LoadingMsg = styled.div`
  color: #4ee1a0;
  text-align: center;
  margin-top: 32px;
`;
const ErrorMsg = styled.div`
  color: #ff4e50;
  text-align: center;
  margin-top: 32px;
`;

const CHAMPION_IMG = (filename) => `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/${filename}`;
const SKILL_IMG = (filename) => `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/${filename}`;
const PASSIVE_IMG = (filename) => `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/passive/${filename}`;

const ChampionModal = ({ champData, loading, error, onClose }) => {
  if (!champData) return null;
  return (
    <ModalBg onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalClose onClick={onClose}>&times;</ModalClose>
        {loading && <LoadingMsg>상세 정보를 불러오는 중...</LoadingMsg>}
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {champData && !loading && !error && (
          <>
            <ModalTop>
              <ModalImg src={CHAMPION_IMG(champData.image.full)} alt={champData.name} />
              <ModalInfoBox>
                <ModalNameBox>{champData.name}</ModalNameBox>
                <ModalTitleBox>{champData.title}</ModalTitleBox>
                <ModalBlurbBox>{champData.blurb}</ModalBlurbBox>
              </ModalInfoBox>
            </ModalTop>
            <ModalSkills>
              {/* 패시브 */}
              <SkillBox>
                <SkillImg src={PASSIVE_IMG(champData.passive.image.full)} alt="패시브" />
                <SkillKey>P</SkillKey>
                <SkillName>{champData.passive.name}</SkillName>
              </SkillBox>
              {/* QWER */}
              {champData.spells.map((spell, idx) => (
                <SkillBox key={spell.id}>
                  <SkillImg src={SKILL_IMG(spell.image.full)} alt={spell.name} />
                  <SkillKey>{['Q','W','E','R'][idx]}</SkillKey>
                  <SkillName>{spell.name}</SkillName>
                </SkillBox>
              ))}
            </ModalSkills>
          </>
        )}
      </ModalContent>
    </ModalBg>
  );
};

export default ChampionModal; 