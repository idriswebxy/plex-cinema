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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const styles = {
  color: "black",
  marginSpace: {
    padding: "30px",
  },
  centerText: {
    textAlign: "center",
  },
};

const UpdatingPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      console.log("updating!");
      popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Popover ref={ref} content {...props}>
        {children}
      </Popover>
    );
  }
);

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
}) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    loadCart(authenticated);
    // getPriceTotal(userId); //TODO: temp off
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const authCart = (
    <div style={styles.marginSpace}>
      {cart.map((movie, key) => (
        <div key={key}>
          <Image
            rounded
            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
          />
          <div>{movie.title}</div>

          <OverlayTrigger
            trigger="click"
            overlay={
              <UpdatingPopover id="popover-contained">
                Item Added!
              </UpdatingPopover>
            }
          >
            <Button
              variant="danger"
              onClick={() => deleteItem(movie.id, key, price, authenticated)}
            >
              Remove
            </Button>
          </OverlayTrigger>
        </div>
      ))}
    </div>
  );

  const guest = (
    <div style={styles.marginSpace}>
      {guestCart.map((movie, key) => (
        <div key={key}>
          <Image
            rounded
            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
          />
          <div>{movie.title}</div>

          <OverlayTrigger
            trigger="click"
            overlay={
              <UpdatingPopover id="popover-contained">
                Item Removed!
              </UpdatingPopover>
            }
          >
            <Button
              variant="danger"
              onClick={() => deleteItem(movie.id, key, price)}
            >
              Remove
            </Button>
          </OverlayTrigger>
        </div>
      ))}
    </div>
  );

  return <div>{authenticated ? authCart : guest}</div>;
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  guestCart: state.cart.guestCart,
  total: state.cart.totalPrice,
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
