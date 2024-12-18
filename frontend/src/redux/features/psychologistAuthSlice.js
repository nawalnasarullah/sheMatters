import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: "psychologistAuth",
    initialState: {
        psychologist: null,
        isAuthenticated: false
    },
    reducers: {
        setPsychologistInfo: (state, action) => {
            state.psychologist = action.payload
            state.isAuthenticated = true
        },
        clearPsychologistInfo: (state, action) => {
            state.psychologist = null
            state.isAuthenticated = false
        }
    }
});

export const {setPsychologistInfo, clearPsychologistInfo} = actions
export default reducer

