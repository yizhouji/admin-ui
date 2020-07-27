import request from '@/utils/request'

const productApi = {
  products: '/warehouse/products',
  productsCategories: '/warehouse/products/categories',
  download: '/warehouse/products/download',
  import: '/warehouse/products/import',
  units: '/warehouse/products/units'

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
export function getProducts (parameter) {
  return request({
    url: productApi.products,
    method: 'get',
    params: parameter
  })
}

export function addProducts (parameter) {
  return request({
    url: productApi.products,
    method: 'post',
    data: parameter
  })
}

export function productsDownload (parameter) {
  return request({
    url: productApi.download,
    method: 'get',
    params: parameter
  })
}

export function productsCategories (parameter) {
  return request({
    url: productApi.productsCategories,
    method: 'get',
    params: parameter
  })
}

export function productsImport (parameter) {
  return request({
    url: productApi.import,
    method: 'post',
    data: parameter
  })
}

export function getUnits (parameter) {
  return request({
    url: productApi.units,
    method: 'get',
    params: parameter
  })
}
