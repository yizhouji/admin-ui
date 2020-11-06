/*
 * @Author: zhaojingyu
 * @Date: 2020-11-06 10:15:47
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-06 10:28:58
 */
import request from '@/utils/request'

const userApi = {
  UpdateHeadImage: '/warehouse/infos/headImg'

}

export function updateHeadImage (parameter) {
    return request({
      url: userApi.UpdateHeadImage,
      method: 'put',
      data: parameter
    })
  }
