import React, { useState, useEffect } from "react";
// import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../../actions/alert";
import { register, setProfile } from "../../actions/auth";

const Register = ({ setAlert, register, authenticated }) => {
  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (authenticated) {
    return <Redirect to="/movies" />;
  }

  return <div>404</div>;
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
