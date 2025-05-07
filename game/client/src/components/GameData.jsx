import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 100px;
`;

const SearchContainer = styled.form`
  display: flex;
  gap: 20px;
`;

const SearchInput = styled.input`
  padding: 20px;
  font-size: 16px;
  width: 400px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Youtube = () => {
  // 사용자 입력 상태 정의
  const [searchQuery, setSearchQuery] = useState(""); // 사용되지 않지만, 초기 상태
  const [result, setResult] = useState(null); // API 응답 데이터 저장용
  const [gameName, setGameName] = useState(""); // 사용자 입력: 게임 이름
  const [tagLine, setTagLine] = useState(""); // 사용자 입력: 태그라인

  // 게임 이름, 태그라인 입력값 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 현재 이건 사용되지 않음
  };

  // 폼 제출 시 실행되는 함수
  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 막기

    // 입력값이 비어 있을 경우 경고
    if (!gameName.trim() || !tagLine.trim()) {
      alert("게임 이름과 태그라인을 모두 입력해주세요!");
      return;
    }

    try {
      // 백엔드 API로 GET 요청 보내기
      const response = await axios.get(
        `/api/account/${encodeURIComponent(gameName)}/${encodeURIComponent(
          tagLine
        )}`
      );
      // 응답 데이터를 상태에 저장
      setResult(response.data);
      // 사용자에게 puuid(고유 식별자) 보여주기
      alert(`소환사 ID: ${response.data.puuid}`);
    } catch (error) {
      // 오류 발생 시 콘솔 출력 및 사용자에게 알림
      console.error("API 요청 실패:", error);
      alert(`오류: ${error.response?.data?.message || error.message}`);
    }
  };
  return (
    <Wrapper>
      <Inner>
        <Title>Game ID</Title>
        {/* 검색 입력 폼 */}
        <SearchContainer onSubmit={handleSearchSubmit}>
          {/* 게임 이름 입력 필드 */}
          <SearchInput
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="게임 이름 (예: Hide on bush)"
          />
          {/* 태그라인 입력 필드 */}
          <SearchInput
            type="text"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            placeholder="태그라인 (예: KR1)"
          />
          <SearchButton type="submit">검색</SearchButton>
        </SearchContainer>
      </Inner>
    </Wrapper>
  );
};

export default Youtube;
