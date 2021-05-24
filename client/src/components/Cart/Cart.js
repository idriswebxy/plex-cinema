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
  color: "white",
  marginSpace: {
    padding: "30px",
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
  movie,
  guestCart,
}) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    loadCart(authenticated);
    // getPriceTotal(userId); //TODO: temp off
  }, []);

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Container>
      <Table style={styles}>
        <tr>
          <thead>Cart Movies</thead>
        </tr>
        {authenticated
          ? cart.map((movie, key) => (
              <div style={styles.marginSpace} key={key}>
                <img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                />
                <div>{movie.title}</div>

                {/* <Button
                  variant="danger"
                  onClick={() => deleteItem(movie.id, key, price)}
                >
                  Remove
                </Button> */}

                <OverlayTrigger
                  trigger="click"
                  overlay={
                    <UpdatingPopover id="popover-contained">
                      Item Added!
                    </UpdatingPopover>
                  }
                >
                  <Button onClick={() => deleteItem(movie.id, key, price)}>
                    Remove
                  </Button>
                </OverlayTrigger>
              </div>
            ))
          : guestCart.map((movie, key) => (
              <div style={styles.marginSpace} key={key}>
                <Image
                  rounded
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                />
                <div>{movie.title}</div>

                {/* <Button
                  variant="danger"
                  onClick={() => deleteItem(movie.id, key, price)}
                >
                  Remove
                </Button> */}
                <OverlayTrigger
                  trigger="click"
                  overlay={
                    <UpdatingPopover id="popover-contained">
                      Item Added!
                    </UpdatingPopover>
                  }
                >
                  <Button style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }} onClick={() => deleteItem(movie.id, key, price)}>
                    Remove
                  </Button>
                </OverlayTrigger>
              </div>
            ))}
      </Table>
    </Container>
  );
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
