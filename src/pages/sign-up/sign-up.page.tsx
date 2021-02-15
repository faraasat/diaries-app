import {
  faEnvelope,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postLoginData } from "../../store/login.reducer";
import "./sign-up.styles.css";
import { toast } from "react-toastify";
import cuid from "cuid";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [newsletterStatus, setNewsletterStatus] = useState(false);
  const [agreementStatus, setAgreementStatus] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewsLetterChange = () => {
    setNewsletterStatus(!newsletterStatus);
  };

  const handleAgreementChange = () => {
    setAgreementStatus(!agreementStatus);
  };

  const HandleSignUp = (e: any) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 3 || email.length < 3) {
      toast.error(
        "❌ Please Check the fields. Every Field must contain more than 3 characters!"
      );
      return;
    }
    dispatch(
      postLoginData({
        id: cuid(),
        username: username,
        password: password,
        email: email,
        newsletter: newsletterStatus,
      })
    );
    toast.success("✔ Sign Up Successful!");
    navigate("/login");
  };

  return (
    <section className="sign-up-page__alignment">
      <form className="sign-up-page__form">
        <div className="sign-up-page__form-head">Sign Up</div>
        <div className="sign-up-page__form-block__display">
          <TextField
            label="Username"
            variant="outlined"
            placeholder="e.g. Max"
            onChange={(e) => setUsername(e.target!.value!)}
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
            label="Email"
            variant="outlined"
            placeholder="e.g. max@example.com"
            type="email"
            onChange={(e) => setEmail(e.target!.value!)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faEnvelope} color="grey" />
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
            onChange={(e) => setPassword(e.target!.value!)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faLock} color="grey" />
                </InputAdornment>
              ),
            }}
            required
          />
          <div style={{ margin: "15px 0px", width: "90%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreementStatus}
                  onChange={handleAgreementChange}
                  name="agreement"
                  color="primary"
                />
              }
              label="&nbsp;&nbsp;Do you agree to our Licence and Agreement?"
            />
          </div>
          <div style={{ margin: "0px 0px 15px 0px", width: "90%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newsletterStatus}
                  onChange={handleNewsLetterChange}
                  name="newsletter"
                  color="primary"
                />
              }
              label="Want to have Update and News? Subscribe to our newsletter!"
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
            to="/login"
          >
            Already have Account? Login Now!
          </Link>
          <button
            disabled={!agreementStatus}
            type="submit"
            className="sign-up-page__btn"
            onClick={(e) => HandleSignUp(e)}
          >
            sign up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
