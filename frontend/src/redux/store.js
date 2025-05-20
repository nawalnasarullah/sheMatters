import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./features/authSlice";
import { authApi } from "./api/authApi";
import { psychologistAuthApi } from "./api/psychologistAuthApi";
import { journalApi } from "./api/journalApi";
import psychologistReducer from "./features/psychologistAuthSlice"
import { psychologistApi } from "./api/psychologistApi";
import { appointmentApi } from "./api/appointmentApi";
import { chatApi } from "./api/chatApi";
import chatReducer from "./features/chatSlice";
import videoCallReducer from "./features/videoCallSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  psychologistAuth: psychologistReducer,
  chat: chatReducer,
  videoCall: videoCallReducer,
  [authApi.reducerPath]: authApi.reducer,
  [psychologistAuthApi.reducerPath]: psychologistAuthApi.reducer,
  [journalApi.reducerPath]: journalApi.reducer,
  [psychologistApi.reducerPath]: psychologistApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'psychologistAuth', 'chat'], // Only persist these slices
  blacklist: [
    authApi.reducerPath, 
    psychologistAuthApi.reducerPath,
    journalApi.reducerPath,
    psychologistApi.reducerPath,
    appointmentApi.reducerPath,
    chatApi.reducerPath
  ] // Don't persist API caches
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat([
      authApi.middleware, 
      psychologistAuthApi.middleware, 
      journalApi.middleware, 
      psychologistApi.middleware, 
      appointmentApi.middleware, 
      chatApi.middleware
    ]),
});

export const persistor = persistStore(store);
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