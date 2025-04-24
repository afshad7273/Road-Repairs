import { createSlice } from "@reduxjs/toolkit";
import { getDecodedData, getUserData } from "../utils/storageHandler";

export const slicecust = createSlice({
    name: 'user',
    initialState: {
        name: getDecodedData()?.name || null,
        email: getDecodedData()?.email || null,
        token: getUserData() || null,
        isLogin: getUserData() ? true : false,
        role: getDecodedData()?.role || null
    },
    reducers: {
        signup: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },

        login: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isLogin = true;

            // Store in sessionStorage for persistence
            sessionStorage.setItem('token', action.payload.token);
        },

        logout: (state) => {
            state.isLogin = false;
            state.role = null;
            state.name = null;
            state.email = null;
            state.token = null;

            // Clear user-related storage
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.clear(); // Ensure everything is removed
        },
    }
});

export const { signup, login, logout } = slicecust.actions;
export default slicecust.reducer;
