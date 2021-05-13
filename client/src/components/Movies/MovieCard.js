import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import Spinner from "../Spinner/LoadSpinner";
import { addToCart, loadCart, auth0_addToCart } from "../../actions/cart";
import moment from "moment";
// import MovieDetails from "./MovieDetails";
import auth from "../../reducers/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Figure from "react-bootstrap/Figure";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { SET_CAST } from "../../actions/types";


const styles = {
  // textAlign: "center",
  // marginTop: "10px",
};

const MovieCard = ({ movie, getMovie, itemClass }) => {
  const { isAuthenticated } = useAuth0();

  const [moviePrev, setMoviePrev] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let movieCard = (
    <div style={styles}>
      <Link to={`/movie_info/${movie.id}`} onClick={() => getMovie(movie.id)}>
        <Image
          rounded
          // fluid
          src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
        />
      </Link>
      <div style={styles}>
        <p>
          {movie.title}&nbsp;({moment(movie.release_date).format("YYYY")})
        </p>
      </div>
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
