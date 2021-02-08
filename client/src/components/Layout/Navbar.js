import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Link as Linker } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, loadUser, googleAuth } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import Spinner from "../Spinner/LoadSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "../Search/Search";
import { REACT_APP_SERVER_URL } from "../../config";
import { LOGIN_SUCCESS, USER_LOADED, GOOGLE_AUTH } from "../../actions/types";
import store from "../../store";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SvgIcon,
} from "@material-ui/core/";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  "& > svg": {
    margin: theme.spacing(2),
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Navbar = ({
  auth: { authenticated, userInfo },
  logOut,
  cart,
  auth0User,
}) => {
  const {
    user,
    logout,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  let accountName = null;
  let serverUrl = REACT_APP_SERVER_URL;
  const classes = useStyles();

  const guestLinks = (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon href="/" style={{ fontSize: 40 }} />

            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Plex Cinema
          </Typography>
          <Button href="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  return <div>{guestLinks}</div>;

  // const guestLinks = <div></div>;

  // return <div>{authenticated || isAuthenticated ? authLinks : guestLinks}</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logOut })(Navbar);
