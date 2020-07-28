import request from '@/utils/request'

const billApi = {
  checklists: '/warehouse/checklists'
}
export function getChecklists (parameter) {
  return request({
    url: billApi.checklists,
    method: 'get',
    params: parameter
  })
}
