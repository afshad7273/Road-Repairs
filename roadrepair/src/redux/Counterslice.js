import { createSlice } from "@reduxjs/toolkit";



const Counterslice=createSlice({
    name:'counter',
    initialState:{value:0},
    reducers:{
        increment(state){
            state.value++
        },
        decrement(state){
            state.value--
        },

    }
})
export const { increment, decrement } = Counterslice.actions
export default Counterslice.reducer
