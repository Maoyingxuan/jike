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