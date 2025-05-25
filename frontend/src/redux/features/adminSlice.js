import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        isAuthenticated: false
    },
    reducers: {
        setAdminInfo: (state, action) => {
            state.admin = action.payload
            state.isAuthenticated = true
        },
        clearAdminInfo: (state, action) => {
            state.admin = null
            state.isAuthenticated = false
        }
    }
});

export const {setAdminInfo, clearAdminInfo} = actions
export default reducer

