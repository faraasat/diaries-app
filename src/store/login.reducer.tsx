import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ILoginData } from "./login";

const initialLoginData: ILoginData[] = [
  {
    id: "",
    username: "",
    password: "",
    email: "",
    newsletter: false,
  },
];

const userLoginData: any = {
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
    login: (state, action) => {
      let flag: boolean = false;
      if (action.payload.username === "" && action.payload.password === "") {
        return;
      }
      Object.entries(state.loginData)
        .filter((datum: any) => {
          return (
            datum[1].username.includes(action.payload.username) &&
            datum[1].password.includes(action.payload.password)
          );
        })
        .map(([key, value]: [any, any]) => {
          flag = true;
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
      if (!flag) {
        toast.error("❌ Incorrect Username or Password!", {
          position: "bottom-right",
        });
      }
    },
    logout: (state) => {
      state.loginState = false;
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

export const { login, logout } = LoginReducer.actions;

export const selectLoginData = (state: any) => ({
  loadingState: state.loginData.loadingState,
  loginState: state.loginData.loginState,
  loginData: state.loginData.loginData,
  userData: state.loginData.userData,
});
