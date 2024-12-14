import request from "../request";

export const feedback = (params: object) =>
request({
    url: `/feedback`,
    method: 'post',
    params: params
})