import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "../../actions/cart";
import { loadMovieDetails, setMovie, getMovie } from "../../actions/movie";
import SpinnerPage from "../Spinner/LoadSpinner";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import moment from "moment";
import Container from "react-bootstrap/Container";

const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  isLoading_app,
  voteAverage,
  withRouter,
  history,
}) => {
  const [videoKey, setVideoKey] = useState(null);
  const [movieID, setMovieID] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideoKey(data.results[0].key));
    loadCart();
    console.log(movie.title)
  }, []);

  // useEffect(() => {
  //   setMovieID(movie.id)
  // }, [movie])

  // // if (isLoading) {
  //   return <SpinnerPage />;
  // }

  return (
    <Container>
      <div
      // style={{
      //   backgroundImage: `linear-gradient(to right,
      // rgba(19, 38, 47, 0.7) 0%,
      // rgba(9, 28, 37, 0.7) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,

      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
      >
        {movie.title == null ? null : movie.title}
      </div>
    </Container>
  );
};

// MovieDetails.propTypes = {
//   match: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
  isLoading_app: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, {
    addToCart,
    loadMovieDetails,
    getMovie,
    loadCart,
  })(MovieDetails)
);
