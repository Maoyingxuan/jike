import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
const userStore = createSlice({
    name:"user",
    initialState:{
        token:''
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
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