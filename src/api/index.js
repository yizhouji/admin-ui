import request from '@/utils/request'

const indexApi = {
  salerooms: '/warehouse/indexs/salerooms'
}
export function Salerooms (parameter) {
  return request({
    url: indexApi.salerooms,
    method: 'get',
    params: parameter
  })
}
