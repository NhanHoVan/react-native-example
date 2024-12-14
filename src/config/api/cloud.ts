import request from "../request-clien";

export const translation = (params: object) =>
    request({
        url: `/translate/v2`,
        method: 'post',
        params: params
    })
