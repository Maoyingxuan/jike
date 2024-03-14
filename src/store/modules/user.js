import { removeToken} from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken ,getToken } from "@/utils";
import { loginAPI,getProfileAPI } from "@/apis/user";
const userStore = createSlice({
    name:"user",
    initialState:{
        token:getToken() || '',
        userInfo:{}
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            _setToken(action.payload)
        },
        setuserInfo(state,action){
            state.userInfo = action.payload
        },
        clear(state){
            state.token = ''
            state.userInfo ={}
            removeToken()
        }
    }
})
const fetchLogin =(loginForm)=>{
    return async(dispatch)=>{
       const res = await loginAPI(loginForm)
    //    console.log(res);
       dispatch(setToken(res.data.data.token))
    }
}
const fetchuserInfo =(userInfo)=>{
    return async(dispatch)=>{
       const res = await getProfileAPI()
       dispatch(setuserInfo(res.data.data))
    }
}
const {setToken,setuserInfo,clear} = userStore.actions
const userReducer = userStore.reducer
export {fetchLogin, setToken}
export {fetchuserInfo,setuserInfo}
export {clear}
export {userReducer}