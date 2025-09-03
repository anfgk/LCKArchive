// API 베이스 URL 설정
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:4000' : '');

// API 엔드포인트
export const API_ENDPOINTS = {
  PLAYER_DATA: '/api/player-data',
  MATCHES: '/api/matches',
  ACCOUNT: '/api/account',
  SUMMONER: '/api/summoner',
  LEAGUE: '/api/league',
  MATCH: '/api/match'
};
