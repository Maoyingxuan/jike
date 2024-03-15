import { useEffect, useState } from "react";
import { channelAPI } from "@/apis/publish"; 
function useChannel(){
        //   获取频道列表
        const [channelList,setChannelList]=useState([])
        useEffect(()=>{
            const getChannelList = async() =>{
                const res = await channelAPI()
                setChannelList(res.data.data.channels)
                // console.log(res)
            }
            getChannelList()
            // console.log(channelList)
        },[])
        return {channelList}
}
export {useChannel}