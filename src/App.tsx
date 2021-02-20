import "./App.css";
import RouteConfig from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import LoginData from "./data/login-data.json";
import DiaryData from "./data/diary-data.json";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  initiateLogin,
  selectLoginData,
  initialLoginData,
} from "./store/login.reducer";
import { CircularProgress } from "@material-ui/core";
import {
  selectDiariesData,
  InitialDiariesData,
  getDiariesData,
  getPublicDiaries,
  diariesData,
} from "./store/diaries.reducer";

function App() {
  const dispatch = useDispatch();
  const { loadingState, loginState, loginData } = useSelector(selectLoginData);
  const { allDiariesData, diaryLoadingState } = useSelector(selectDiariesData);

  useEffect(() => {
    if (
      loginData?.length <= 1 &&
      loginData === initialLoginData &&
      loginData !== null &&
      !(loginData?.length > 1) &&
      loadingState === false
    ) {
      dispatch(getLoginData());
      const data = JSON.parse(localStorage.getItem("loginCred")!);
      if (data?.length <= 0 || data === null) {
        dispatch(getLoginData());
        localStorage.setItem("loginCred", JSON.stringify(LoginData));
      }
    }
    let userLoginCred = JSON.parse(sessionStorage.getItem("userLoginCred")!);

    if (
      allDiariesData?.length <= 1 &&
      allDiariesData === InitialDiariesData &&
      allDiariesData !== null &&
      diaryLoadingState === false
    ) {
      const data = JSON.parse(localStorage.getItem("allDiariesData")!);
      if (data?.length <= 0 || data === null) {
        dispatch(getDiariesData());
        localStorage.setItem("allDiariesData", JSON.stringify(DiaryData));
      }
    }

    if (loadingState || diaryLoadingState) {
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

    const diaryData = JSON.parse(localStorage.getItem("allDiariesData")!);

    diaryLoadingState === false &&
      allDiariesData === InitialDiariesData &&
      dispatch(diariesData(diaryData)) &&
      dispatch(getPublicDiaries());
  });

  return (
    <>
      <RouteConfig />
      <ToastContainer />
    </>
  );
}

export default App;
