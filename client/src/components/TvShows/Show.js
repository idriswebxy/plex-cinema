import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getShow } from "../../actions/movie";
// import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, addToCartTvShow } from "../../actions/cart";
import moment from "moment";

const Show = ({
  id,
  image,
  getShow,
  isLoading,
  tvShowObj,
  price,
  index,
  addToCart,
  title,
  releaseDate,
}) => {
  useEffect(() => {}, []);

  let showList = <div>404</div>;

  return <div>{showList}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getShow, addToCart })(Show);
