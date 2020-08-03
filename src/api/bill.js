import request from '@/utils/request'

const billApi = {
  getChecklists: '/warehouse/checklists',
  addChecklists: '/warehouse/checklists',
  getCheckDetails: '/warehouse/checklists/'
}

export function getCheckDetails (id) {
  return request({
    url: billApi.getCheckDetails + id,
    method: 'get'
  })
}
export function getChecklists (parameter) {
  return request({
    url: billApi.getChecklists,
    method: 'get',
    params: parameter
  })
}

export function addChecklists (parameter) {
  return request({
    url: billApi.addChecklists,
    method: 'post',
    data: parameter
  })
}
