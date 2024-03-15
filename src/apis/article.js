import { request } from "@/utils";
export function getArticleListAPI(params){
    return request({
        url:'/mp/articles',
        method:'GET',
        params
    })
}
export function delArticleAPI(data){
    return request({
        url:`/mp/articles/${data.id}`,
        method:'DELETE',
    })
}
