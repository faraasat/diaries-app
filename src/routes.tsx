import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";

const RouteConfig = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default RouteConfig;
