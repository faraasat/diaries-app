import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ILoginData } from "./store.d";

export const initialLoginData: ILoginData[] = [
  {
    id: "",
    username: "",
    password: "",
    email: "",
    newsletter: false,
  },
];

export const userLoginData: any = {
  id: "",
  username: "",
  password: "",
  email: "",
  newsletter: false,
};

export const getLoginData: any = createAsyncThunk(
  "data/getLoginData",
  async (data, thunkAPI) => {
    const response = await fetch("api/login-data");
    return await response.json();
  }
);

export const postLoginData: any = createAsyncThunk(
  "data/getLoginData",
  async (data, thunkAPI) => {
    const response = await fetch("api/login-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

const LoginReducer = createSlice({
  name: "loginData",
  initialState: {
    loadingState: false,
    loginState: false,
    loginData: initialLoginData,
    userData: userLoginData,
  },
  reducers: {
    initiateLogin: (state, action) => {
      if (
        (action.payload.username === "" && action.payload.password === "") ||
        action.payload === null
      ) {
        return;
      }
      if (state.loadingState === false) {
        Object.entries(state.loginData)
          .filter((datum: any) => {
            return (
              datum[1].username.includes(action.payload.username) &&
              datum[1].password.includes(action.payload.password)
            );
          })
          .map(([key, value]: [any, any]) => {
            sessionStorage.setItem(
              "userLoginCred",
              JSON.stringify({
                id: value.id,
                username: value.username,
                password: value.password,
                email: value.email,
                newsletter: value.newsletter,
              })
            );
            state.userData = {
              id: value.id,
              username: value.username,
              password: value.password,
              email: value.email,
              newsletter: value.newsletter,
            };
            state.loginState = true;
            return value;
          });
      }
    },
    login: (state, action) => {
      let flag: boolean = false;
      if (
        (action.payload.username === "" && action.payload.password === "") ||
        action.payload === null
      ) {
        return;
      }
      if (state.loadingState === false) {
        Object.entries(state.loginData)
          .filter((datum: any) => {
            return (
              datum[1].username.includes(action.payload.username) &&
              datum[1].password.includes(action.payload.password)
            );
          })
          .map(([key, value]: [any, any]) => {
            flag = true;
            sessionStorage.setItem(
              "userLoginCred",
              JSON.stringify({
                id: value.id,
                username: value.username,
                password: value.password,
                email: value.email,
                newsletter: value.newsletter,
              })
            );
            state.userData = {
              id: value.id,
              username: value.username,
              password: value.password,
              email: value.email,
              newsletter: value.newsletter,
            };
            state.loginState = true;
            toast.success("✔ Logged In Successfully!", {
              position: "bottom-right",
            });
            return value;
          });
        if (!flag && state.loadingState === false) {
          toast.error("❌ Incorrect Username or Password!", {
            position: "bottom-right",
          });
        }
      }
    },
    logout: (state) => {
      // sessionStorage.setItem("userLoginState", JSON.stringify(false));
      state.loginState = false;
      sessionStorage.setItem("userLoginCred", JSON.stringify(userLoginData));
      state.userData = userLoginData;
      toast.success("✔ Logged Out Successfully!", {
        position: "bottom-right",
      });
    },
  },
  extraReducers: {
    [getLoginData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loginData = action.payload;
      state.loadingState = false;
    },
    [getLoginData.reject]: (state, action) => {
      console.log("Fetch Data Failed");
      state.loadingState = false;
    },
    [getLoginData.pending]: (state, action) => {
      console.log("Fetch Data Pending");
      state.loadingState = true;
    },
    [postLoginData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loginData = action.payload;
      state.loadingState = false;
    },
    [postLoginData.reject]: (state, action) => {
      console.log("Fetch Data Failed");
      state.loadingState = false;
    },
    [postLoginData.pending]: (state, action) => {
      console.log("Fetch Data Pending");
      state.loadingState = true;
    },
  },
});

export default LoginReducer;

export const { initiateLogin, login, logout } = LoginReducer.actions;

export const selectLoginData = (state: any) => ({
  loadingState: state.loginData.loadingState,
  loginState: state.loginData.loginState,
  loginData: state.loginData.loginData,
  userData: state.loginData.userData,
});
