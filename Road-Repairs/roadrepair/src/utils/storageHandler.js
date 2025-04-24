import { jwtDecode } from "jwt-decode"


export const getUserData = ()=>{
    return sessionStorage.getItem("token") || null
}

export const getDecodedData = ()=>{
    
    return sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null
}


export const getBreakdown = () =>{
    console.log("HIHI",sessionStorage.getItem("breakdownId"));
    
    return sessionStorage.getItem("breakdownId") || null
}