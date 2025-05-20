import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCalling: false,
  incomingCall: null,
  callAccepted: false,
};

const videoCallSlice = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    startCall: (state) => {
      state.isCalling = true;
    },
    receiveCall: (state, action) => {
      state.incomingCall = action.payload;
    },
    acceptCall: (state) => {
      state.callAccepted = true;
    },
    endCall: (state) => {
      return initialState;
    },
  },
});

export const { startCall, receiveCall, acceptCall, endCall } = videoCallSlice.actions;
export default videoCallSlice.reducer;
