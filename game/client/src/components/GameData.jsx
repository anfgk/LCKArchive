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
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!gameName.trim() || !tagLine.trim()) {
      alert("게임 이름과 태그라인을 모두 입력해주세요!");
      return;
    }

    try {
      const response = await axios.get(
        `/api/account/${encodeURIComponent(gameName)}/${encodeURIComponent(
          tagLine
        )}`
      );
      setResult(response.data);
      alert(`소환사 ID: ${response.data.puuid}`);
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert(`오류: ${error.response?.data?.message || error.message}`);
    }
  };
  return (
    <Wrapper>
      <Inner>
        <Title>Game ID</Title>
        <SearchContainer onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="게임 이름 (예: Hide on bush)"
          />
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
