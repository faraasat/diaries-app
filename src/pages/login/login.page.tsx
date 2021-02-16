import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./login.styles.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getLoginData,
  login,
  selectLoginData,
} from "../../store/login.reducer";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [agreementStatus, setAgreementStatus] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginState, loadingState } = useSelector(selectLoginData);

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

  if (loginState === true) {
    navigate("/diaries");
  }

  const handleAgreementChange = () => {
    setAgreementStatus(!agreementStatus);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(login({ username: username, password: password }));
    navigate("/diaries");
  };

  useEffect(() => {
    dispatch(getLoginData());
  }, [dispatch]);

  return (
    <section className="login-page__alignment">
      <form className="login-page__form">
        <div className="login-page__form-head">Login</div>
        <div className="login-page__form-block__display">
          <TextField
            label="Username"
            variant="outlined"
            placeholder="e.g. Max"
            onChange={(e) => setUsername(e.target.value!)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faUserCircle} color="grey" />
                </InputAdornment>
              ),
            }}
            required
          />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            placeholder="e.g. Abc$1234*%"
            onChange={(e) => setPassword(e.target.value!)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faLock} color="grey" />
                </InputAdornment>
              ),
            }}
            required
          />
          <div style={{ margin: "15px 0px 3px 0px", width: "90%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreementStatus}
                  onChange={handleAgreementChange}
                  name="agreement"
                />
              }
              label="&nbsp;&nbsp;Do you agree to our Licence and Agreement?"
            />
          </div>
          <Link
            style={{
              margin: "0px 0px 5px 0px",
              textAlign: "left !important",
              width: "90%",
              color: "darkgreen",
              fontWeight: "bold",
              fontFamily: "Pacifico, cursive",
              fontSize: 18,
            }}
            to="/sign-up"
          >
            Don't have Account? Sign up Now!
          </Link>
          <button
            disabled={!agreementStatus}
            type="submit"
            className="login-page__btn"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
