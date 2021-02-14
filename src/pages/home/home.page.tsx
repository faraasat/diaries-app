import "./home.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <section className="home-page__alignment">
      <div className="home-page__background">
        <h3 className="home-page__heading-main">
          Keep Your Life Save in the Diary and Let The World See it!!
        </h3>
        <p className="home-page__heading-sub">
          We provide world class facility to store and maintain private and
          public diaries so you can have full control over your life notes!
        </p>
        <button className="home-page__btn">
          Get Started Now!&nbsp;
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      </div>
      <div className="home-page__details"></div>
    </section>
  );
};

export default HomePage;
