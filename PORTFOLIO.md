## 프로젝트 소개

LCKArchive는 LCK 팬과 LoL 게이머를 위한 React 기반 SPA로, 팀·선수·챔피언 및 전적 정보를 빠르게 탐색할 수 있도록 설계했습니다. Riot Games API 연동으로 실시간에 가까운 데이터 조회를 제공하며, 모달 중심의 탐색 흐름과 가벼운 번들(Vite)로 쾌적한 사용자 경험을 목표로 했습니다.

## 주요 목표

- 팀/선수/챔피언 탐색 흐름과 검색 UX 설계
- Riot Games API 연동 및 전적 조회 로직 구현
- 반응형 UI와 경량 번들 환경(Vite) 구성

## 기술 스택

- **런타임/언어**: JavaScript (ES6+)
- **프레임워크**: React
- **번들러**: Vite
- **라우팅**: React Router DOM
- **요청/상태**: Axios (요청), 커스텀 훅 기반 상태 분리
- **스타일**: styled-components, styled-reset
- **백엔드**: Node.js, Express, dotenv, CORS
- **배포**: Render (정적 파일 서빙 + 서버 프록시)

## 기능 요약

- **검색/탐색**: 팀·선수·챔피언을 카드/리스트로 탐색, 모달 상세 표시
- **전적 조회**: 소환사/경기 데이터 요청 및 지표 표시(`GameData.jsx`)
- **선수 정보**: 선수별 정보 요약 및 하이라이트(`PlayerInfo.jsx`)
- **챔피언 뷰**: 챔피언 카드와 상세 모달(`Champion.jsx`, `ChampionModal.jsx`)
- **UX 보조**: 로딩/에러 상태, 기본 예외 처리, 반응형 레이아웃

## 페이지 구조

- **Home** (`client/src/components/Main.jsx`): 랜딩 및 히어로(영상/이미지), 주요 진입 CTA
- **Search** (`client/src/components/Search.jsx`): 검색 입력, 결과 리스트, 필터/정렬
- **Team** (`client/src/components/Team.jsx` · `TeamModal.jsx`): 팀 목록, 상세 모달
- **Champion** (`client/src/components/Champion.jsx` · `ChampionModal.jsx`): 챔피언 브라우징/상세
- **GameData** (`client/src/components/GameData.jsx`): 전적/세부 지표
- **PlayerInfo** (`client/src/components/PlayerInfo.jsx`): 선수 정보 요약

## 폴더 구조(요약)

```text
client/
  public/
    img/              # 팀/선수/챔피언 로고·이미지
    videos/           # 히어로 배경 영상(lck.mp4)
  src/
    assets/
      team.js         # 팀 데이터
      player.js       # 선수 데이터
      chatbotResponses.js # 챗봇 응답 데이터
    components/
      Main.jsx
      Search.jsx
      Team.jsx
      TeamModal.jsx
      Champion.jsx
      ChampionModal.jsx
      GameData.jsx
      PlayerInfo.jsx
      Chatbot.jsx
    App.jsx
    main.jsx
server/
  server.js           # Express 서버, Riot API 프록시/환경변수
```

## 실행 방법

```bash
# 루트에서 의존성 설치(루트/클라이언트/서버)
npm run install-all

# 개발 서버 실행
npm run dev:client    # Vite 개발 서버
npm run dev:server    # nodemon로 Express 서버
```

## 빌드/배포

- 개발: `npm run dev:client`, `npm run dev:server`
- 빌드: `npm run build` (client 빌드 → `client/dist` 산출)
- 실행: `npm start` (정적 파일 서빙 + API 프록시)
- 배포: Render에 환경변수 설정 후 루트 `deploy` 스크립트로 자동화

## 데이터/로직 개요

- **정적 데이터**: `client/src/assets/team.js`, `player.js`, `chatbotResponses.js`
- **API 연동**: 클라이언트는 `/api`로 호출 → Vite 프록시(`client/vite.config.js`) → 서버(`server/server.js`) → Riot API
- **결과 표시**: 컴포넌트 단위로 지표 렌더링, 에러/로딩 상태 일원화

## 스크린샷/에셋

- 이미지: `client/public/img/` (팀 로고, 선수/챔피언 이미지, `lck.svg` 등)
- 영상: `client/public/videos/lck.mp4` (메인 히어로 배경)

## 접근성/UX 고려

- 키보드 포커스 가능한 주요 CTA와 모달 포커스 트랩 고려
- 이미지 대체 텍스트 제공(필요 시 지속 보완)
- 모바일 퍼스트 레이아웃, 가독성 높은 타이포 조정

## 개선 아이디어(향후 계획)

- URL 쿼리 기반 공유/딥링크(검색/선수/챔피언 상태 영속화)
- 데이터 캐싱 고도화(React Query 도입, 재검증/Prefetch)
- 코드 스플리팅 및 이미지 최적화(WebP/적응형 로딩)
- 유닛 테스트 도입(API/파서/정렬 로직 검증)
- 접근성 강화(모달 ARIA 속성, 키보드 내비 개선)

## 회고

- 라우팅·상태·데이터 주도 UI를 일관된 흐름으로 연결
- 서버 프록시/배포까지 포함해 실사용 환경 전 과정을 경험
- 공통 로직 훅 분리와 에러 처리 일관화로 유지보수성 향상
