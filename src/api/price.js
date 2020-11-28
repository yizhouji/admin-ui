import request from '@/utils/request'

const indexApi = {
  price: '/warehouse/costs/commodity',
  wechatPay: '/warehouse/pay/wechat',
  aliPay: '/warehouse/pay/zfb',
  wechatPayResult: '/warehouse/pay/wechat/result/',
  aliPayResult: '/warehouse/pay/zfb/result/'

}
export function price () {
  return request({
    url: indexApi.price,
    method: 'get'
  })
}

export function wechatPay (parameter) {
    return request({
      url: indexApi.wechatPay,
      method: 'post',
      data: parameter
    })
  }

  export function aliPay (parameter) {
    return request({
      url: indexApi.aliPay,
      method: 'post',
      data: parameter
    })
  }

  export function wechatPayResult (id) {
    return request({
      url: indexApi.wechatPayResult + id,
      method: 'get'
    })
  }

  export function aliPayResult (id) {
    return request({
      url: indexApi.aliPayResult + id,
      method: 'get'
    })
  }
