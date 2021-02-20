import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  selectLoginData,
  userLoginData,
  login,
} from "../../store/login.reducer";
import { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Tooltip,
  Zoom,
  withStyles,
  Theme,
  CircularProgress,
  AppBar,
  Button,
  Container,
  Card,
  CardActionArea,
} from "@material-ui/core";
import "./diaries.styles.css";
import PublicIcon from "@material-ui/icons/Public";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DialogComponent from "../../components/dialog/dialog.component";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";
import {
  getYourDiaries,
  postDiaryName,
  selectDiariesData,
} from "../../store/diaries.reducer";
import { IPublicDiaries } from "../../store/diaries";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      hidden={Number(value) !== Number(index)}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box p={3}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const DiariesPage = () => {
  const { loginState, loadingState, userData } = useSelector(selectLoginData);
  const { diaryLoadingState, allPublicDiaries, yourDiaries } = useSelector(
    selectDiariesData
  );
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [onClickOpen, setOnClickOpen] = useState<boolean>(false);
  const [viewState, setViewState] = useState<string>("none");
  const [changeState, setChangeState] = useState<boolean>(false);
  const [viewData, setViewData] = useState<IPublicDiaries[]>([
    {
      name: "",
      diary_name: "",
      diary_content: [
        {
          note_name: "",
          note_content: "",
        },
      ],
    },
  ]);

  let prevRef = useRef(yourDiaries);

  useEffect(() => {
    const prevChange = changeState;
    if (
      prevChange !== changeState &&
      prevRef !== yourDiaries &&
      diaryLoadingState !== false
    ) {
      dispatch(getYourDiaries(userData.id));
      console.log("in");
    }
    if (userData === userLoginData) {
      dispatch(getLoginData());
      dispatch(
        login({ username: userData.username, password: userData.password })
      );
    }
  }, [
    dispatch,
    loadingState,
    userData,
    changeState,
    yourDiaries,
    diaryLoadingState,
  ]);

  prevRef = yourDiaries;

  if (loadingState || diaryLoadingState) {
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

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handlePublicDiaries = () => {
    setViewState("public");
    setViewData(allPublicDiaries);
    setValue(0);
  };

  const handleYourDiaries = () => {
    setViewState("your");
    dispatch(getYourDiaries(userData.id));
    setValue(0);
  };

  const youDiary = yourDiaries.filter((datum: any) => {
    return datum.diary_name !== "";
  });

  const pubDiary = viewData.filter((datum: any) => {
    return datum.diary_name !== "";
  });

  return (
    <section className="diaries-page__alignment">
      <div className="diaries-page__background">
        {viewState === "none" ? (
          <div className="diaries-page__home">
            <Card className="diaries-page__home-card">
              <CardActionArea
                onClick={() => handlePublicDiaries()}
                className="diaries-page__home-action"
              >
                <PublicIcon />
                <h3>View Public Diaries</h3>
                <p>
                  Public Diaries are those diaries that are publicly available
                  and anyone can see it. They are view only and non editable!
                </p>
              </CardActionArea>
            </Card>
            <Card className="diaries-page__home-card">
              <CardActionArea
                className="diaries-page__home-action"
                onClick={() => handleYourDiaries()}
              >
                <LocalLibraryIcon />
                <h3>View Your Diaries</h3>
                <p>
                  Your Diaries includes your private and public diaries. Private
                  diaries are only for you. You can view and edit them!
                </p>
              </CardActionArea>
            </Card>
          </div>
        ) : viewState === "public" ? (
          <>
            <AppBar position="static" className="diaries-page__top-bar">
              <Container
                maxWidth="lg"
                className="diaries-page__top-bar__container"
              >
                <div>
                  <Button color="inherit" onClick={() => handleYourDiaries()}>
                    <LocalLibraryIcon />
                    &nbsp;&nbsp;View Your Diaries
                  </Button>
                </div>
                <div>
                  <Button color="inherit">
                    <VisibilityIcon />
                    &nbsp;&nbsp;View Only
                  </Button>
                </div>
              </Container>
            </AppBar>
            <div className="diaries-page__tab-side">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className="diaries-page__tab-side__tabs"
              >
                {pubDiary!.map((publicDiaries: any, index: number) => {
                  return (
                    <HtmlTooltip
                      key={index}
                      TransitionComponent={Zoom}
                      disableFocusListener
                      title={
                        <Fragment>
                          <b className="tab_tooltip__head">DiaryName: </b>{" "}
                          <span>{publicDiaries!.diary_name}</span>
                          <br />
                          <b className="tab_tooltip__head">By: </b>{" "}
                          <span>{publicDiaries!.name.toUpperCase()}</span>
                          <br />
                        </Fragment>
                      }
                      interactive
                      placement="right"
                      arrow
                    >
                      <Tab
                        className="diaries-page__tab-side__tabs-list"
                        key={Number(index)}
                        label={
                          publicDiaries!.diary_name.length <= 15
                            ? publicDiaries!.diary_name
                            : publicDiaries!.diary_name.slice(0, 15) + "..."
                        }
                      />
                    </HtmlTooltip>
                  );
                })}
              </Tabs>
              {pubDiary!.map((publicDiaries: any, index: number) => {
                return (
                  <TabPanel
                    key={Number(index)}
                    value={value}
                    index={Number(index)}
                  >
                    <AppBar position="static" className="tab-panel__top-bar">
                      <Container
                        maxWidth="lg"
                        className="tab-panel__top-bar__container"
                      >
                        <div>
                          <Button color="inherit">
                            <LibraryBooksIcon />
                            &nbsp;&nbsp;Diary Name: {publicDiaries.diary_name}
                          </Button>
                        </div>
                        <div>
                          <Button color="inherit">
                            <SupervisedUserCircleIcon />
                            &nbsp;&nbsp;Author: {publicDiaries.name}
                          </Button>
                        </div>
                      </Container>
                    </AppBar>
                    <div className="tab-panel__box">
                      {publicDiaries!.diary_content!.map((note: any) => {
                        return (
                          <div className="tab-panel__note">
                            <h1 className="tab-panel__note-name">
                              {note.note_name}
                            </h1>
                            <p className="tab-panel__note-content">
                              {note.note_content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                );
              })}
            </div>
          </>
        ) : viewState === "your" ? (
          <>
            <AppBar position="static" className="diaries-page__top-bar">
              <Container
                maxWidth="lg"
                className="diaries-page__top-bar__container"
              >
                <div>
                  <Button color="inherit" onClick={() => handlePublicDiaries()}>
                    <LocalLibraryIcon />
                    &nbsp;&nbsp;View Public Diaries
                  </Button>
                </div>
                <div>
                  <Button color="inherit" onClick={() => setOnClickOpen(true)}>
                    <AddCircleIcon />
                    &nbsp;&nbsp;Add New Diary
                  </Button>
                </div>
              </Container>
            </AppBar>
            <div className="diaries-page__tab-side">
              {youDiary?.length <= 0 || youDiary === null ? (
                <div className="diaries-page__no-diary">No Diary Found</div>
              ) : (
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  className="diaries-page__tab-side__tabs"
                >
                  {youDiary!.map((publicDiaries: any, index: number) => {
                    return (
                      <HtmlTooltip
                        key={index}
                        TransitionComponent={Zoom}
                        disableFocusListener
                        title={
                          <Fragment>
                            <b className="tab_tooltip__head">Diary Name: </b>{" "}
                            <span>{publicDiaries!.diary_name}</span>
                            <br />
                            <b className="tab_tooltip__head">
                              Diary Visibility:{" "}
                            </b>{" "}
                            <span>
                              {publicDiaries?.diary_type?.toUpperCase()}
                            </span>
                            <br />
                          </Fragment>
                        }
                        interactive
                        placement="right"
                        arrow
                      >
                        <Tab
                          className="diaries-page__tab-side__tabs-list"
                          key={Number(index)}
                          label={
                            publicDiaries!.diary_name.length <= 11
                              ? publicDiaries!.diary_name
                              : publicDiaries!.diary_name.slice(0, 11) + "..."
                          }
                        />
                      </HtmlTooltip>
                    );
                  })}
                </Tabs>
              )}
              {youDiary!.map((publicDiaries: any, index: number) => {
                return (
                  <TabPanel
                    key={Number(index)}
                    value={value}
                    index={Number(index)}
                  >
                    <AppBar position="static" className="tab-panel__top-bar">
                      <Container
                        maxWidth="lg"
                        className="tab-panel__top-bar__container"
                      >
                        <div>
                          <Button color="inherit">
                            <LibraryBooksIcon />
                            &nbsp;&nbsp;Diary Name: {publicDiaries.diary_name}
                          </Button>
                        </div>
                        <div>
                          <Button color="inherit">
                            <VisibilityIcon />
                            &nbsp;&nbsp;Diary Visibility:{" "}
                            {publicDiaries.diary_type}
                          </Button>
                          <Button color="inherit">
                            <PostAddIcon />
                            &nbsp;&nbsp;Add New Note
                          </Button>
                        </div>
                      </Container>
                    </AppBar>
                    <div className="tab-panel__box">
                      {publicDiaries!.diary_content.length <= 1 ? (
                        <div className="tab-panel__no-notes">No Notes</div>
                      ) : (
                        publicDiaries!.diary_content!.map((note: any) => {
                          return (
                            <div className="tab-panel__note">
                              <h1 className="tab-panel__note-name">
                                {note.note_name}
                              </h1>
                              <p className="tab-panel__note-content">
                                {note.note_content}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </TabPanel>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
        <DialogComponent
          openClose={onClickOpen}
          setOpenClose={setOnClickOpen}
          setChangeState={setChangeState}
          changeState={changeState}
          performAction={postDiaryName}
        />
      </div>
    </section>
  );
};

export default DiariesPage;
