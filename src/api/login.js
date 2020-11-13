/*
 * @Author: zhaojingyu
 * @Date: 2020-07-28 10:41:54
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-13 10:26:25
 */
import request from '@/utils/request'

const userApi = {
  Login: '/warehouse/login',
  Logout: '/warehouse/logout',
  GetQrcode: '/warehouse/weChat/qrcode',
  CheckLogin: '/warehouse/weChat/checkLogin',
  telLogin: '/warehouse/telLogin',
  telLoginCode: '/warehouse/telLogin/code'

}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'get'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function getQrcode () {
  return request({
    url: userApi.GetQrcode,
    method: 'get'
  })
}

export function checkLogin (parameter) {
  return request({
    url: userApi.CheckLogin + '?sceneStr=' + parameter,
    method: 'post'
  })
}

export function telLoginCode (parameter) {
  return request({
    url: userApi.telLoginCode,
    method: 'get',
    params: parameter
  })
}

export function telLogin (parameter) {
  return request({
    url: userApi.telLogin,
    method: 'post',
    data: parameter
  })
}
