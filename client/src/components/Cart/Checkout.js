import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

const Checkout = () => {
  return (
    <Container>
      <h1
        style={{
          paddingTop: "20%",
          margin: "auto",
          display: "flex",
          color: "white",
        }}
      >
        Your order is complete!{" "}
      </h1>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps)(Checkout);
