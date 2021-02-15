import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container, IconButton, Menu, MenuItem } from "@material-ui/core";
import "./navbar.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginData, logout } from "../../store/login.reducer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginState, userData } = useSelector(selectLoginData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/login");
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        &nbsp;&nbsp; Logout
      </MenuItem>
    </Menu>
  );
  console.log(loginState, userData);

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
          {loginState ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              &nbsp;&nbsp;{userData.username}
            </IconButton>
          ) : (
            <>
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
              </Link>{" "}
            </>
          )}
        </Toolbar>
      </Container>
      {renderMenu}
    </AppBar>
  );
}
