import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login.page";

const RouteConfig = () => {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default RouteConfig;
