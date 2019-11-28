import request from '_u/request'

export function getAllProducts() {
  return request({
    url: '/product/find',
    method: 'get'
  })
}
