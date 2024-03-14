import { request } from "@/utils";
export function loginAPI(dataForm){
    return request({
        url:'/authorizations',
        method:'POST',
        data:dataForm
    })
}
export function getProfileAPI(){
    return request({
        url:'/user/profile',
        method:'GET',
    })
}