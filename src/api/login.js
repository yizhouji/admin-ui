/*
 * @Author: zhaojingyu
 * @Date: 2020-07-28 10:41:54
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-02 17:13:03
 */
import request from '@/utils/request'

const userApi = {
  Login: '/warehouse/login',
  Logout: '/warehouse/logout',
  Wechat: '/warehouse/weChat/login'
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
export function Wechat (code) {
  return request({
    url: userApi.Wechat,
    method: 'get',
    params: code
  })
}
