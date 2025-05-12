import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./api/authApi";
import { psychologistAuthApi } from "./api/psychologistAuthApi";
import { journalApi } from "./api/journalApi";
import psychologistReducer from "./features/psychologistAuthSlice"
import { psychologistApi } from "./api/psychologistApi";
import { appointmentApi } from "./api/appointmentApi";
import { chatApi } from "./api/chatApi";
import chatReducer from "./features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologistAuth : psychologistReducer ,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [psychologistAuthApi.reducerPath]: psychologistAuthApi.reducer,
    [journalApi.reducerPath]: journalApi.reducer, // journal api ko slice or reducer ky saath link krty or store ko react app ky saath link krty
    [psychologistApi.reducerPath]: psychologistApi.reducer, // psychologist api ko slice or reducer ky
    [appointmentApi.reducerPath]: appointmentApi.reducer, // appointment api ko slice or reducer ky
    [chatApi.reducerPath]: chatApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, psychologistAuthApi.middleware, journalApi.middleware, psychologistApi.middleware, appointmentApi.middleware, chatApi.middleware ]), // ye caching, invalidation, polling k kaam krti
});

export default store;

/* 

api-> reducer or hooks deti
slice-> reducer or action deta
                    |
                    v
phir api or slice dono ko store ky saath link krty or phir store ko react app ky saath link krty
                    |
                    v
phir call krty waqt data fetch krein ge api se and wapis la kr slice ko dein ge and slice puri application mein data rotate karay gi

*/
