import React, { useState, useEffect } from "react";
// import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../../actions/alert";
import { register, setProfile } from "../../actions/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useForm } from "react-hook-form";

const Register = ({ setAlert, authenticated }) => {
  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
    console.log({ ...formData });
  };

  const { email, password, password2 } = formData;

  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      register({ email, password });
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  const registerForm = (
    <Container>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Label>Register</Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Enter email"
            value={email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
            value={password}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Confirm Password"
            value={password2}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );

  return <div>{registerForm}</div>;
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
