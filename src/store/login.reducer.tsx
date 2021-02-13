import { createSlice } from "@reduxjs/toolkit";
import { ILoginData } from "./login";

const initialLoginData: ILoginData = {
  username: "",
  password: "",
  email: "",
};

const LoginReducer = createSlice({
  name: "loginData",
  initialState: {
    loadingState: false,
    loginData: initialLoginData,
  },
  reducers: {},
  extraReducers: {},
});

export default LoginReducer;

// export const {} = LoginReducer.actions;
