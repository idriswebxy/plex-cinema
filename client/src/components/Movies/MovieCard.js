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
import Figure from "react-bootstrap/Figure";
import Card from 'react-bootstrap/Card'


const MovieCard = ({ movie }) => {
  const { isAuthenticated } = useAuth0();

  const [moviePrev, setMoviePrev] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let movieCard = (
    <div>
      <Figure>
        <Figure.Image
          width={200}
          height={180}
          alt="200x180"
          src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
        />
        <h5>{movie.title}</h5>
      </Figure>
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
