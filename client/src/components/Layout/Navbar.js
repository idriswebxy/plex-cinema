import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, loadUser, googleAuth } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import Spinner from "../Spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "../Search/Search";
import { REACT_APP_SERVER_URL } from "../../config";
import { LOGIN_SUCCESS, USER_LOADED, GOOGLE_AUTH } from "../../actions/types";
import store from "../../store";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  Pane,
  Heading,
  Link,
  TabNavigation,
  Tab,
  SidebarTab,
} from "evergreen-ui";

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
    <TabNavigation>
      <Pane display="flex" padding={16} background="tint1" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Tab href="/">
            <Heading size={600}>Plex Cinema</Heading>
          </Tab>

          <Tab href="/movies" marginLeft={20}>
            Movies
          </Tab>
          <Tab href="/tv-shows" marginLeft={20}>
            TvShows
          </Tab>
          <Tab href="/logout" marginRight={20}>
            Logout
          </Tab>
        </Pane>
      </Pane>
    </TabNavigation>
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
