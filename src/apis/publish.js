import { request } from "@/utils";
export function channelAPI(){
    return request({
        url:'/channels',
        method:'GET',
    })
}