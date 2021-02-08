import React, { useEffect } from "react";
import { connect } from "react-redux";



const Checkout = () => {
  return (
    // <Pane>
    //   <h1
    //     style={{
    //       paddingTop: "20%",
    //       margin: "auto",
    //       display: "flex",
    //       color: "white",
    //     }}
    //   >
    //     Your order is complete!{" "}
    //   </h1>
    // </Pane>
    <div>Checkout</div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps)(Checkout);
