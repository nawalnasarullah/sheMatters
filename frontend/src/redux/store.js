import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./api/authApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]), // ye caching, invalidation, polling k kaam krti
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
