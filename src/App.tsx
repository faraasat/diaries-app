import "./App.css";
import RouteConfig from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import LoginData from "./data/login-data.json";

function App() {
  useEffect(() => {
    localStorage.setItem("loginCred", JSON.stringify(LoginData));
  });

  return (
    <>
      <RouteConfig />
      <ToastContainer />
    </>
  );
}

export default App;
