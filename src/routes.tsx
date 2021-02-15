import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component";
import DiariesPage from "./pages/diaries/diaries.component";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign-up.page";

const RouteConfig = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/sign-up" element={<SignUpPage />} />
        <Route exact path="/diaries" element={<DiariesPage />} />
      </Routes>
    </>
  );
};

export default RouteConfig;
