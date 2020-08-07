import request from '@/utils/request'

const noteApi = {
  getNote: '/warehouse/notepads',
  addNote: '/warehouse/notepads'
}
export function getNote (parameter) {
  return request({
    url: noteApi.getNote,
    method: 'get',
    params: parameter
  })
}

export function addNote (parameter) {
  return request({
    url: noteApi.addNote,
    method: 'post',
    data: parameter
  })
}
