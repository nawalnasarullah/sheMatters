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
        },
        updateUserProfile: (state, action) => {
            console.log('action payload : ' , action.payload)
            state.user = action.payload
        }
    }
});

export const {setUserInfo, clearUserInfo , updateUserProfile} = actions
export default reducer

