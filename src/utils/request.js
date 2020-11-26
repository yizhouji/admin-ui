/*
 * @Author: zhaojingyu
 * @Date: 2020-07-28 10:41:56
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-12 15:10:16
 */
import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const axiosConfig = {
  // API 请求的默认前缀

  timeout: 60000 // 请求超时时间
}
// if (process.env.NODE_ENV === 'production') {
//    axiosConfig.baseURL = 'http://47.101.190.37:8080'
// }

const request = axios.create(axiosConfig)

let list = ['/warehouse/infos/bind']

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 500) {
      console.log(error.response)
      let url = error.response.request.responseURL
      let bool = false
      list.forEach(element => {
          if (url.indexOf(url) > -1) {
            bool = true
          }
      })
      if (!bool) {
        notification.error({
          message: '请求失败',
          description: data.message
        })
      } else {
        return Promise.reject(error.response)
      }
    }
    if (error.response.status === 403) {
      notification.error({
        message: '禁止访问',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '未登录',
        description: error.response.data.message || '登录已过期，请重新登录'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error.response)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
