import "./home.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileWink,
  faThumbsUp,
  faUsersCog,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonBase, Card, Container } from "@material-ui/core";

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
      <div className="home-page__details">
        <Container>
          <div className="home-page__details-detail">
            <ButtonBase className="home-page__details-card">
              <Card className="home-page__details-card-1">
                <FontAwesomeIcon
                  icon={faUsersCog}
                  className="home-page__details-icon"
                />
                <h2 className="home-page__details-heading__main">
                  Public & Private
                </h2>
                <p className="home-page__details-heading__sub">
                  You can make Public and Private Diaries. Its Your Choice!!
                </p>
              </Card>
            </ButtonBase>
            <ButtonBase className="home-page__details-card">
              <Card className="home-page__details-card-2">
                <FontAwesomeIcon
                  icon={faUserTag}
                  className="home-page__details-icon"
                />
                <h2 className="home-page__details-heading__main">
                  Life Events
                </h2>
                <p className="home-page__details-heading__sub">
                  Share your life events notes with the world and make them
                  smile!
                </p>
              </Card>
            </ButtonBase>
            <ButtonBase className="home-page__details-card">
              <Card className="home-page__details-card-3">
                <FontAwesomeIcon
                  icon={faSmileWink}
                  className="home-page__details-icon"
                />
                <h2 className="home-page__details-heading__main">
                  Great Moments
                </h2>
                <p className="home-page__details-heading__sub">
                  Take notes of everyday life so you can go back to your great
                  moments!!
                </p>
              </Card>
            </ButtonBase>
          </div>
        </Container>
      </div>
      <div className="home-page__cover">
        <Container>
          <div className="home-page__cover-cover">
            <h2 className="home-page__cover-heading">
              We are providing free services just for you so you can store your
              public and private diaries with one of the best interface. We are
              very passionate to see you using our service.
            </h2>
            <button>Write Your First Diary Know</button>
          </div>
        </Container>
      </div>
      <footer className="home-page__footer">
        Copyright &copy; 2021. All Right Reserved.
      </footer>
    </section>
  );
};

export default HomePage;
