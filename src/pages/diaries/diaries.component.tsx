import "./diaries.styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  selectLoginData,
  userLoginData,
  login,
} from "../../store/login.reducer";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

const DiariesPage = () => {
  const { loginState, loadingState, userData } = useSelector(selectLoginData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData === userLoginData) {
      dispatch(getLoginData());
      dispatch(
        login({ username: userData.username, password: userData.password })
      );
    }
  }, [dispatch, loadingState, userData]);

  if (loadingState) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (loginState === false && loadingState === false) {
    navigate("/login");
  }

  return (
    <section className="diaries-page__alignment">
      <div className="diaries-page__background">Hello from Diaries</div>
    </section>
  );
};

export default DiariesPage;
