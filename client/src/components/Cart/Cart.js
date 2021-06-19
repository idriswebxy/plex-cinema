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
import Image from "react-bootstrap/Image";

const styles = {
  color: "black",
  marginSpace: {
    padding: "30px",
  },
  centerText: {
    textAlign: "center",
  },
};

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
  guestCart,
  guestTotal,
}) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    loadCart(authenticated);
    getPriceTotal(userId, authenticated);
  }, [deleteItem, total]);

  if (loading) {
    return <Spinner />;
  }

  const authCart = (
    <Table hover>
      <thead>
        <tr>
          <th>Movie</th>
          <th>Price</th>
        </tr>
      </thead>
      {cart.map((movie, key) => (
        <tbody key={key}>
          <tr>
            <td>
              <Image
                rounded
                src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
              />
              <div>{movie.title}</div>
            </td>
            <td>
              ${price}
              &nbsp; &nbsp;&nbsp;
              <Button
                variant="danger"
                onClick={() => deleteItem(movie.id, key, price, authenticated)}
              >
                <i class="bi bi-trash-fill"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      ))}
      <tbody>
        <tr>
          <td></td>
          <td>
            <h5>Total: ${total}</h5>
          </td>
        </tr>
      </tbody>
    </Table>
  );

  const guest = (
    <Table style={styles.marginSpace} hover>
      <thead>
        <tr>
          <th>Movie</th>
          <th>Price</th>
        </tr>
      </thead>
      {guestCart.map((movie, key) => (
        <tbody key={key}>
          <tr>
            <td>
              <Image
                rounded
                src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
              />
              <div>{movie.title}</div>
            </td>
            <td>
              ${price}
              &nbsp; &nbsp;&nbsp;
              <Button
                variant="danger"
                onClick={() => deleteItem(movie.id, key, price, authenticated)}
              >
                <i class="bi bi-trash-fill"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      ))}
      <tbody>
        <tr>
          <td></td>
          <h5>Total: ${guestTotal}</h5>
          <div style={styles.marginSpace}>
            <Button href="/checkout" variant="success">
              Checkout <i class="bi bi-box-arrow-right"></i>
            </Button>
          </div>
        </tr>
      </tbody>
    </Table>
  );

  return <Container>{authenticated ? authCart : guest}</Container>;
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  guestCart: state.cart.guestCart,
  total: state.cart.totalPrice,
  guestTotal: state.cart.guestTotal,
  loading: state.cart.loading,
  userId: state.auth.userInfo._id,
  authenticated: state.auth.authenticated,
  movie: state.movie.searchedMovie,
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal,
})(Cart);
