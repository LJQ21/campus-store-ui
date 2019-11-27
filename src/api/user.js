import request from '_u/request'
import qs from 'qs'

export function loginByAccount(data) {
  return request({
    url: '/user/login/account',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function loginByPhone(data) {
  return request({
    url: '/user/login/mobile_phone',
    method: 'get',
    data
  })
}

export function getInfo() {
  return request({
    url: '/token',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function send(phone_number) {
  return request({
    url: '/third-part/submail/send',
    method: 'get',
    params: { phone_number }
  })
}

export function verify(verification_code) {
  return request({
    url: '/user/register/verify',
    method: 'get',
    params: { verification_code }
  })
}
