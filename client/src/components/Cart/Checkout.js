import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import Login from "../../components/Auth/Login";

const Checkout = ({ authenticated }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Order is Complete!</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Checkout);
