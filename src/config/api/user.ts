
import request from "../request"

export const login = (params: any) =>
request({
    url: `/user/login`,
    method: 'post',
    data: params
})

export const lostPassword = (params: object) =>
request({
    url: `/user/lost-password/`,
    method: 'post',
    params: params
})

export const changePassword = (params: object) =>
request({
    url: `/user/change-password/`,
    method: 'post',
    params: params
})

export const registerUser = (params: object) => 
request({
    url: '/user/register/',
    method: 'post',
    params
})

export const registerConfirm = (params: object) => 
request({
    url: '/user/register-confirm/',
    method: 'post',
    params
})

export const detailUser = (id: number) =>
request({
    url: `/user/${id}/`,
    method: 'get'
})

export const updateUser = (id: number, params: object) => 
request({
    url: `/user/${id}/`,
    method: 'patch',
    params
})