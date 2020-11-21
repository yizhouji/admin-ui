import request from '@/utils/request'

const billApi = {
    sceneStr: '/warehouse/checklists/sceneStr'
}

export function sceneStr (parameter) {
    return request({
      url: billApi.sceneStr,
      method: 'get',
      params: parameter
    })
  }
