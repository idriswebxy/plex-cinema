import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import Spinner from "../Spinner/LoadSpinner";
import { addToCart, loadCart, auth0_addToCart } from "../../actions/cart";
import moment from "moment";
// import MovieDetails from "./MovieDetails";
import auth from "../../reducers/auth";
import { useAuth0 } from "@auth0/auth0-react";


const MovieCard = ({ movie }) => {
  const { isAuthenticated } = useAuth0();

  const [moviePrev, setMoviePrev] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let movieCard = (
    <div>
      <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} />

      <h6>{movie.title}</h6>
      {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
      {/* <Button variant="primary">Go somewhere</Button> */}
    </div>
  );

  return <div>{movieCard}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
  // userId: state.auth.userInfo._id,
});

export default connect(mapStateToProps, {
  getMovie,
  addToCart,
  auth0_addToCart,
})(MovieCard);
