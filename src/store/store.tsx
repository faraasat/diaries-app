import { configureStore } from "@reduxjs/toolkit";
import DiariesReducer from "./diaries.reducer";
import LoginReducer from "./login.reducer";

export default configureStore({
  reducer: {
    loginData: LoginReducer.reducer,
    diaries: DiariesReducer.reducer,
  },
});
