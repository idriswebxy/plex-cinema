import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import Spinner from "../Spinner/LoadSpinner";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = ({
  cart,
  loadCart,
  getPriceTotal,
  total,
  loading,
  deleteItem,
  price = 2.99,
  userId,
  authenticated,
}) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    loadCart();
    getPriceTotal(userId);
  }, [total]);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (loading || isLoading) {
    return <Spinner />;
  }

  let cartItems = <div>404</div>;

  let checkOut = (
    <div>404</div>
    // <div style={{ marginLeft: "10px", color: "white" }}>
    //   <h2>Total: ${total.toFixed(2)}</h2>
    //   <NavLink to="/checkout">c</NavLink>
    // </div>
  );

  let cartItemsTest = (
    <div>404</div>
    // <Table striped bordered hover>
    //   <thead></thead>
    // </Table>
  );

  return (
    // <Container>
    //   <div style={{ marginTop: "100px" }}>
    //     {/* <h3>Cart: {cart.length} item(s)</h3>
    //     <div>{cartItems}</div>
    //     <div>{checkOut}</div> */}
    //     {cartItemsTest}
    //   </div>
    // </Container>
    <div>404</div>
  );
};

Cart.propTypes = {
  loadCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  total: state.cart.totalPrice,
  loading: state.cart.loading,
  userId: state.auth.userInfo._id,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal,
})(Cart);
