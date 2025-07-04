import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChampionModal from "./ChampionModal";

const Wrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 0 80px 0;
  color: #fff;
`;
const Title = styled.h2`
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 28px;
`;
const Card = styled.div`
  background: #181818;
  border-radius: 14px;
  padding: 18px 12px 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  min-height: 200px;
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
    transition: transform 0.3s ease;
  }
`;
const ChampImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 12px;
  background: #222;
`;
const ChampName = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;
const ChampTitle = styled.div`
  color: #007bff;
  font-size: 0.98rem;
  margin-bottom: 6px;
`;
const LoadingMsg = styled.div`
  color: #007bff;
  text-align: center;
  margin-top: 32px;
`;
const ErrorMsg = styled.div`
  color: #ff4e50;
  text-align: center;
  margin-top: 32px;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 36px 0 0 0;
`;
const PageBtn = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #444;
    color: #aaa;
    cursor: not-allowed;
  }
  &.active {
    background: #007bff;
    color: #111;
  }
`;

const CHAMPION_API = "https://ddragon.leagueoflegends.com/cdn/14.12.1/data/ko_KR/champion.json";
const CHAMPION_DETAIL_API = (id) => `https://ddragon.leagueoflegends.com/cdn/14.12.1/data/ko_KR/champion/${id}.json`;
const CHAMPION_IMG = (filename) => `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/${filename}`;
const CHAMPS_PER_PAGE = 15;

const Champion = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalChamp, setModalChamp] = useState(null); // {id, data}
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    const fetchChampions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(CHAMPION_API);
        if (!res.ok) throw new Error("API 요청 실패");
        const data = await res.json();
        const champArr = Object.values(data.data);
        setChampions(champArr);
      } catch (e) {
        setError("챔피언 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  const totalPages = Math.ceil(champions.length / CHAMPS_PER_PAGE);
  const startIdx = (page - 1) * CHAMPS_PER_PAGE;
  const endIdx = startIdx + CHAMPS_PER_PAGE;
  const currentChamps = champions.slice(startIdx, endIdx);

  // 모달 열기: 챔피언 상세 fetch
  const openModal = async (champ) => {
    setModalLoading(true);
    setModalError(null);
    setModalChamp({id: champ.id, data: null});
    try {
      const res = await fetch(CHAMPION_DETAIL_API(champ.id));
      if (!res.ok) throw new Error("상세 정보 요청 실패");
      const data = await res.json();
      setModalChamp({id: champ.id, data: data.data[champ.id]});
    } catch (e) {
      setModalError("상세 정보를 불러오지 못했습니다.");
    } finally {
      setModalLoading(false);
    }
  };
  const closeModal = () => setModalChamp(null);

  return (
    <Wrapper id="champion-section">
      <Title>리그 오브 레전드 챔피언</Title>
      {loading && <LoadingMsg>챔피언 정보를 불러오는 중...</LoadingMsg>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {!loading && !error && (
        <>
          <Grid>
            {currentChamps.map((champ) => (
              <Card key={champ.key} onClick={() => openModal(champ)}>
                <ChampImg src={CHAMPION_IMG(champ.image.full)} alt={champ.name} />
                <ChampName>{champ.name}</ChampName>
                <ChampTitle>{champ.title}</ChampTitle>
              </Card>
            ))}
          </Grid>
          <Pagination>
            <PageBtn onClick={() => setPage(page-1)} disabled={page === 1}>&lt;</PageBtn>
            {Array.from({length: totalPages}, (_, idx) => (
              <PageBtn
                key={idx+1}
                onClick={() => setPage(idx+1)}
                className={page === idx+1 ? 'active' : ''}
              >
                {idx+1}
              </PageBtn>
            ))}
            <PageBtn onClick={() => setPage(page+1)} disabled={page === totalPages}>&gt;</PageBtn>
          </Pagination>
        </>
      )}
      {/* 모달 */}
      {modalChamp && (
        <ChampionModal
          champData={modalChamp.data}
          loading={modalLoading}
          error={modalError}
          onClose={closeModal}
        />
      )}
    </Wrapper>
  );
};

export default Champion; 