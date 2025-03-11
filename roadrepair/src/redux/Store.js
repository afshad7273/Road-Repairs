import { configureStore } from "@reduxjs/toolkit";
import count from "./Counterslice";
import customer from "./userSlice";


export const store=configureStore({
    reducer:{
        counter:count,
        auth:customer,

    }
})




