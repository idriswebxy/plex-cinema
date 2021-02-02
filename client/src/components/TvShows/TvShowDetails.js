import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import Spinner from "../Spinner/Spinner";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import Show from "./Show";

const TvShowDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  tvShow,
}) => {
  useEffect(() => {
    loadCart();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  let tvShowDetails = <div>404</div>;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
    rgba(19, 38, 47, 0.925) 0%,
    rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {tvShowDetails}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tvShow: state.movie.searchedShow,
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
})(TvShowDetails);
