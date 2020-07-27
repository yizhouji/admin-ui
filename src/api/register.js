import request from '@/utils/request'

const userApi = {
  register: '/warehouse/registers',
  getCode: '/warehouse/registers/code'
}

export function register (parameter) {
  return request({
    url: userApi.register,
    method: 'post',
    data: parameter
  })
}

export function getSmsCode (parameter) {
  return request({
    url: userApi.getCode,
    method: 'get',
    params: parameter
  })
}
