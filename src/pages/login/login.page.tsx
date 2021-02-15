import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import "./login.styles.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [agreementStatus, setAgreementStatus] = useState(true);

  const handleAgreementChange = () => {
    setAgreementStatus(!agreementStatus);
  };

  return (
    <section className="login-page__alignment">
      <form className="login-page__form">
        <div className="login-page__form-head">Login</div>
        <div className="login-page__form-block__display">
          <TextField
            label="Username"
            variant="outlined"
            placeholder="e.g. Max"
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
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
