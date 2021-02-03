import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
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

  // if (loading || isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="app-main">
     
      <h1>Landing</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Landing);
