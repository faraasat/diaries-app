import "./diaries.styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../store/login.reducer";
import { CircularProgress } from "@material-ui/core";

const DiariesPage = () => {
    const { loginState, loadingState } = useSelector(selectLoginData);
    const navigate = useNavigate();

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

    if (loginState === false) {
      navigate("/login");
    }
    
  return (
    <section className="diaries-page__alignment">
      <div className="diaries-page__background">Hello from Diaries</div>
    </section>
  );
};

export default DiariesPage;
