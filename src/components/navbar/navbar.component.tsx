import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import "./navbar.styles.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className="navbar-stick__bg-styles">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            className={`${classes.title} navbar-brand__styles`}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Diaries App
            </Link>
          </Typography>
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button className="navbar-action__btn" color="inherit">
              Login
            </Button>
          </Link>
          <Link
            to="/sign-up"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button className="navbar-action__btn" color="inherit">
              Sign Up
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
