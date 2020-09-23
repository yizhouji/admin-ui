/*
 * @Author: zhaojingyu
 * @Date: 2020-07-30 15:39:55
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-09-23 16:30:30
 */
import request from '@/utils/request'

const noteApi = {
  getNote: '/warehouse/notepads',
  addNote: '/warehouse/notepads',
  getNoteDetails: '/warehouse/notepads/',
  modifyNote: '/warehouse/notepads',
  deletNote: '/warehouse/notepads/',
  deletNoteList: '/warehouse/notepads/deletes'

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

export function deletNote (parameter) {
  return request({
    url: noteApi.deletNote + parameter,
    method: 'DELETE'
  })
}

export function deletNoteList (parameter) {
  return request({
    url: noteApi.deletNoteList,
    method: 'POST',
    data: parameter
  })
}
