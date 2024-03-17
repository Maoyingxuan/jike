import { request } from "@/utils";
export function channelAPI(){
    return request({
        url:'/channels',
        method:'GET',
    })
}
export function AddArticleAPI(data){
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data:data
    })
}
export function getArticleDetailAPI(data){
    return request({
        url:`/mp/articles/${data}`,
        method:'GET',
    })
}
export function updateArticleAPI(data){
    return request({
        url:`/mp/articles/${data.id}?draft=false`,
        method:'PUT',
        data:data
    })
}