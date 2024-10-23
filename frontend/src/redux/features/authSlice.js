import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        clearUserInfo: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
});

export const {setUserInfo, clearUserInfo} = actions
export default reducer

