/*
 * @Author: zhaojingyu
 * @Date: 2020-11-06 10:15:47
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-12 14:59:07
 */
import request from '@/utils/request'

const userApi = {
  UpdateHeadImage: '/warehouse/infos/headImg',
  ModifyInfo: '/warehouse/infos',
  GetMsgCode: '/warehouse/infos/code',
  BindMobile: '/warehouse/infos/tel',
  getQrCode: '/warehouse/infos/qrcode',
  getBindStatus: '/warehouse/infos/bind'
}

export function updateHeadImage (parameter) {
    return request({
      url: userApi.UpdateHeadImage,
      method: 'put',
      data: parameter
    })
  }

  export function modifyInfo (parameter) {
    return request({
      url: userApi.ModifyInfo,
      method: 'put',
      data: parameter
    })
  }

  export function getMsgCode (parameter) {
    return request({
      url: userApi.GetMsgCode,
      method: 'get',
      params: parameter
    })
  }

  export function bindMobile (parameter) {
    return request({
      url: userApi.BindMobile,
      method: 'put',
      data: parameter
    })
  }
  export function getQrCode () {
    return request({
      url: userApi.getQrCode,
      method: 'get'
    })
  }

  export function getBindStatus (parameter) {
    return request({
      url: userApi.getBindStatus,
      method: 'get',
      params: parameter
    })
  }
