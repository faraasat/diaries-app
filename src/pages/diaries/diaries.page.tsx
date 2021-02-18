import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  selectLoginData,
  userLoginData,
  login,
} from "../../store/login.reducer";
import { useEffect } from "react";
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
} from "@material-ui/core";
import "./diaries.styles.css";
import PublicIcon from "@material-ui/icons/Public";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DialogComponent from "../../components/dialog/dialog.component";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other} style={{ width: "100%" }}>
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
  const { loginState, loadingState, userData, loginData } = useSelector(
    selectLoginData
  );
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [onClickOpen, setOnClickOpen] = useState<boolean>(false);
  const [dialogBoxData, setDialogBoxData] = useState<string>("");

  console.log(dialogBoxData);

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

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <section className="diaries-page__alignment">
      <div className="diaries-page__background">
        <AppBar position="static" className="diaries-page__top-bar">
          <Container maxWidth="lg" className="diaries-page__top-bar__container">
            <div>
              <Button color="inherit">
                <PublicIcon />
                &nbsp;&nbsp;View Public Diaries
              </Button>
              <Button color="inherit">
                <LocalLibraryIcon />
                &nbsp;&nbsp;View Your Diaries
              </Button>
            </div>
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  setOnClickOpen(!onClickOpen);
                }}
              >
                <AddCircleIcon />
                &nbsp;&nbsp;Add a New Diary
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
            if(launches)
            {loginData!.map((datum: any, index: number) => {
              return (
                <HtmlTooltip
                  key={index}
                  TransitionComponent={Zoom}
                  disableFocusListener
                  title={
                    <Fragment>
                      <b className="tab_tooltip__head">Username: </b>{" "}
                      <span>{datum!.username}</span>
                      <br />
                      <b className="tab_tooltip__head">
                        Launch Date UTC:{" "}
                      </b>{" "}
                      <span>{datum!.password}</span>
                      <br />
                    </Fragment>
                  }
                  interactive
                  placement="right"
                  arrow
                >
                  <Tab
                    className="diaries-page__tab-side__tabs-list"
                    key={index}
                    label={datum!.username}
                  />
                </HtmlTooltip>
              );
            })}
          </Tabs>
          {loginData!.map((datum: any, index: number) => {
            return (
              <TabPanel key={index} value={value} index={index}>
                {/* <MissionDetails id={datum?.id} /> */}
              </TabPanel>
            );
          })}
        </div>
        <DialogComponent
          openClose={onClickOpen}
          setOpenClose={setOnClickOpen}
          setDialogBoxData={setDialogBoxData}
        />
      </div>
    </section>
  );
};

export default DiariesPage;
