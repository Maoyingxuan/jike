import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken ,getToken } from "@/utils";
const userStore = createSlice({
    name:"user",
    initialState:{
        token:getToken() || ''
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            _setToken(action.payload)
        }
    }
})
const fetchLogin =(loginForm)=>{
    return async(dispatch)=>{
       const res = await request.post('/authorizations',loginForm)
       dispatch(setToken(res.data.data.token))
    }

}
const {setToken} = userStore.actions
const userReducer = userStore.reducer
export {fetchLogin, setToken}
export {userReducer}