import request from '@/utils/request'

const overstocksApi = {
  overstocks: '/warehouse/overstocks'
}
export function getOverstocks (parameter) {
  return request({
    url: overstocksApi.overstocks,
    method: 'get',
    params: parameter
  })
}
