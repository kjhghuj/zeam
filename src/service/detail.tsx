import http from '@/utils/http';

// 获取游戏详情
export function getdetail(params:any) {
  return http.get('api/game?id='+params.id);
}