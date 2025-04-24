import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import chat from "./chatSlice";

export const store=configureStore({
    reducer:{
        auth:user,
        chat,
    }
})




