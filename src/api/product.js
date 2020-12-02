import request from '@/utils/request'

const productApi = {
  products: '/warehouse/products',
  productsCategories: '/warehouse/products/categories',
  download: '/warehouse/products/download',
  import: '/warehouse/products/import',
  units: '/warehouse/products/units',
  productsInfo: '/warehouse/products/info',
  records: '/warehouse/products/records',
  remark: '/warehouse/products/remark',
  businessStatus: '/warehouse/products/businessStatus',
  deletProduct: '/warehouse/products/'
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
    params: parameter,
    responseType: 'arraybuffer'
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

export function productsImportApi (parameter) {
  return productApi.import
}

export function getUnits (parameter) {
  return request({
    url: productApi.units,
    method: 'get',
    params: parameter
  })
}

export function getProductsInfo (parameter) {
  return request({
    url: productApi.productsInfo,
    method: 'get',
    params: parameter
  })
}

export function records (parameter) {
  return request({
    url: productApi.records,
    method: 'get',
    params: parameter
  })
}

export function remark (parameter) {
  return request({
    url: productApi.remark,
    method: 'put',
    data: parameter
  })
}

export function businessStatus (parameter) {
  return request({
    url: productApi.businessStatus,
    method: 'put',
    data: parameter
  })
}
export function deletProduct (id) {
  return request({
    url: productApi.deletProduct + id,
    method: 'delete'
  })
}
