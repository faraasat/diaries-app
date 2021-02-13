import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./login.reducer";

export default configureStore({
  reducer: {
    loginData: LoginReducer.reducer,
  },
});
