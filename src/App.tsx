import "./App.css";
import RouteConfig from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import LoginData from "./data/login-data.json";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  initiateLogin,
  selectLoginData,
  initialLoginData,
} from "./store/login.reducer";
import { CircularProgress } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();
  const { loadingState, loginState, loginData } = useSelector(selectLoginData);

  useEffect(() => {
    if (
      loginData?.length <= 1 &&
      loginData === initialLoginData &&
      loginData !== null
    ) {
      const data = JSON.parse(sessionStorage.getItem("userLoginCred")!);
      if (data?.length <= 0) {
        dispatch(getLoginData());
        localStorage.setItem("loginCred", JSON.stringify(LoginData));
      }
    }
    let userLoginCred = JSON.parse(sessionStorage.getItem("userLoginCred")!);
    if (loadingState) {
      <div
        style={{
          width: "100%",
          height: "100vh - 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </div>;
    }

    userLoginCred !== null &&
      loadingState === false &&
      loginState === false &&
      userLoginCred !== null &&
      userLoginCred.username !== "" &&
      userLoginCred.password !== "" &&
      dispatch(
        initiateLogin({
          username: userLoginCred.username,
          password: userLoginCred.password,
        })
      );
  });

  return (
    <>
      <RouteConfig />
      <ToastContainer />
    </>
  );
}

export default App;
