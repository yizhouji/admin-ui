import request from '@/utils/request'

const noteApi = {
  getNote: '/warehouse/notepads',
  addNote: '/warehouse/notepads',
  getNoteDetails: '/warehouse/notepads/',
  modifyNote: '/warehouse/notepads'
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

export function modifyNote (parameter) {
  return request({
    url: noteApi.modifyNote,
    method: 'put',
    data: parameter
  })
}

export function getNoteDetails (parameter) {
  return request({
    url: noteApi.getNoteDetails + parameter,
    method: 'get'
  })
}
