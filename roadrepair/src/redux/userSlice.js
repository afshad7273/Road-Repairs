import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { getDecodedData, getUserData } from "../utils/storageHandler";


export const slicecust=createSlice({
    name:'user',
    initialState:{
        name: getDecodedData()?.name || null,
        email: getDecodedData()?.email || null, 
        token: getUserData() || null, 
        islogin:getUserData() ? true : false,
        role:getDecodedData()?.role || null
        
    },
    reducers:{
        signup(state){
            state.islogin = true
            state.token=token,
            state.name=name,
            state.email=email
        },

        login:((state,action)=>{
            state.token = action.payload
            const decoded = jwtDecode(action.payload)
            console.log(decoded);
            state.role = decoded.role
            state.email = decoded.email
            state.name = decoded.name
            state.islogin = true
            
            
        }),


        logout(state){
            state.islogin = false,
            state.token=null,
            state.name=null,
            state.email=null
        },

    }
})
export const { signup, login,logout } = slicecust.actions
export default slicecust.reducer