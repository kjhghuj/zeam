import http from '@/utils/http';

// 获取游戏数据
export function getdata() {
  return http.get('api/games');
}