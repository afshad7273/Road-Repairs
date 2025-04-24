import { createSlice } from "@reduxjs/toolkit";
import { getBreakdown } from "../utils/storageHandler";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        breakdown:getBreakdown() ||  {}

    },
    reducers: {
        updateBreakdownId: (state, action) => {
            state.breakdown = action.payload        
            sessionStorage.setItem("breakdownId",action.payload)
        },
    },
    
});

export const { updateBreakdownId } = chatSlice.actions;
export default chatSlice.reducer;
