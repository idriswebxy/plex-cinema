import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Spinner from "../Spinner/LoadSpinner";
import GoogleButton from "react-google-button";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";


const Login = ({ login, authenticated, loading }) => {
  const { isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  
  if (loading) {
    return <Spinner />;
  }

  const loginForm = (
    <Container>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );

  return <div>{loginForm}</div>;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  autheticated: state.auth.authenticated,
  page: state.movie.page,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
