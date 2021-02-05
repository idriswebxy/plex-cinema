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
import { Pane, Heading, Link, TabNavigation, Tab, Tablist } from "evergreen-ui";

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

  const guestLinks = (
    <Pane display="flex" padding={16} background="#14B5D0" borderRadius={3}>
      <Pane flex={1} alignItems="center" display="flex">
        <Tab is="a" href="/" marginLeft={0}>
          <Heading size={600}>Plex Cinema</Heading>
        </Tab>
        <Tab size={10} is="a" href="/movies" marginLeft={10}>
          Movies
        </Tab>
        <Tab size={10} is="a" href="/tv-shows" marginLeft={10}>
          TvShows
        </Tab>
      </Pane>
      <Tab size={10} is="a" href="/logout" marginRight={10}>
        Logout
      </Tab>
    </Pane>
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
