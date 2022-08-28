import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/hosp/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/hosp/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/hosp/user/logout',
    method: 'post'
  })
}
