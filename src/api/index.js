import request from '@/utils/request'

const indexApi = {
  salerooms: '/warehouse/indexs/salerooms',
  markets: '/warehouse/indexs/markets'
}
export function Salerooms (parameter) {
  return request({
    url: indexApi.salerooms,
    method: 'get',
    params: parameter
  })
}

export function getMarkets (parameter) {
  return request({
    url: indexApi.markets,
    method: 'get',
    params: parameter
  })
}
