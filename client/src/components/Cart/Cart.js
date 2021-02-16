import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import Spinner from "../Spinner/LoadSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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

  if (loading) {
    return <Spinner />;
  }

  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Container>
      <Table>
        <tr>
          <thead>Movie</thead>
        </tr>
        {cart.map((movie, key) => (
          <div key={key}>
            <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
            <div>{movie.title}</div>
            <Button
              variant="danger"
              onClick={() => deleteItem(movie.id, key, price)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Table>
    </Container>
  );
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
