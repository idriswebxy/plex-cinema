import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
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

  const authLinks1 = (
    <Menu>
      <Menu.Item name="editorials" active={true}>
        Editorials the
      </Menu.Item>

      <Menu.Item name="reviews" active={true}>
        Reviews
      </Menu.Item>

      <Menu.Item name="upcomingEvents" active={true}>
        Upcoming Events
      </Menu.Item>
    </Menu>
  );

  // const authLinks = <div></div>;

  // const guestLinks = <div></div>;

  // return <div>{authenticated || isAuthenticated ? authLinks : guestLinks}</div>;
  return <div>{authLinks1}</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logOut })(Navbar);
