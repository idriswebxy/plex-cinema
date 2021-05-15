import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Link as Linker } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, loadUser, googleAuth } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import Spinner from "../Spinner/LoadSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "../Search/Search";
import { REACT_APP_SERVER_URL } from "../../config/config";
import { LOGIN_SUCCESS, USER_LOADED, GOOGLE_AUTH } from "../../actions/types";
import store from "../../store";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const styles = {
  color: "orange",
  msg: {
    color: "white",
  },
};

const NavigationBar = ({
  auth: { authenticated, userInfo },
  logOut,
  cart,
  guestCart,
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <i className="bi bi-film" style={styles}></i>&nbsp;Plex Cinema
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/movies">Movies</Nav.Link> */}
        </Nav>
        <Nav>
          <Nav.Link href="/cart">
            Cart&nbsp;<i className="bi bi-cart3"></i>
            <Badge pill variant="info">
              {authenticated === false ? guestCart.length : cart.length}
            </Badge>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">
            Login&nbsp;<i className="bi bi-box-arrow-in-left"></i>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/register">
            Register&nbsp;<i className="bi bi-box-arrow-in-left"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const authLinks = (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <i className="bi bi-film" style={styles}></i>&nbsp;Plex Cinema
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={styles.msg} className="mr-auto">
          <Nav.Item>
            Welcome <i className="bi bi-person-circle" />
            &nbsp;
            {authenticated ? userInfo.name : null}!
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Link href="/cart">
            Cart&nbsp;<i className="bi bi-cart3"></i>
            <Badge pill variant="info">
              {authenticated === true ? cart.length : guestCart.length}
            </Badge>
          </Nav.Link>
        </Nav>
        {authenticated ? (
          <Nav>
            <Nav.Link href="/login" onClick={() => logOut()}>
              Logout&nbsp;<i className="bi bi-box-arrow-in-left"></i>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">
              Login&nbsp;<i className="bi bi-box-arrow-in-left"></i>
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );

  return <div>{authenticated || isAuthenticated ? authLinks : guestLinks}</div>;

  // const guestLinks = <div></div>;

  // return <div>{authenticated || isAuthenticated ? authLinks : guestLinks}</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
  guestCart: state.cart.guestCart
});

export default connect(mapStateToProps, { logOut })(NavigationBar);
