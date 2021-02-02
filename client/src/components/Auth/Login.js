import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import GoogleButton from "react-google-button";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const Login = ({ login, authenticated, loading }) => {
  const { isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };


  if (authenticated || isAuthenticated) {
    return <Redirect to="/movies" />;
  }

  if (loading || isLoading) {
    return <Spinner />;
  }

  const loginForm = (
    <div>404</div>
  );

  return <div>{loginForm}</div>;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  page: state.movie.page,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
