import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Landing.css";
import "../MainImage/MainImage.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../../components/Spinner/Spinner";

const Landing = ({ login, authenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const { isLoading, isAuthenticated } = useAuth0();

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

  return (
    <div className="app-main">
      {/* <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={(e) => onSubmit(e)}>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                onChange={(e) => onChange(e)}
              />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                onChange={(e) => onChange(e)}
              />
              <div className="text-center mt-4">
                <MDBBtn color="indigo" type="submit">
                  Login
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
      <h1>404</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Landing);
