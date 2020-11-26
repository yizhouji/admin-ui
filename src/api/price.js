import request from '@/utils/request'

const indexApi = {
  price: '/warehouse/costs/commodity',
  wechatPay: '/warehouse/pay/wechat'
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
