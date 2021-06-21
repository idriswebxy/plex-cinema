import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "react-bootstrap/Container";
import MovieList from "./MovieList";
import TopRatedMovies from "./TopRatedMovies";
import { loadCart } from "../../actions/cart";
import LoadSpinner from "../Spinner/LoadSpinner";
import { connect } from "react-redux";
import {
  fetchItems,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../../actions/movie";
import UpcomingMovies from "./UpcomingMovies";
import Search from "../Search/Search";
import MovieNav from "./MovieNav";

const MovieListContainer = ({ loading, authenticated, loadCart }) => {
  useEffect(() => {
    loadCart(authenticated);
    console.log(window.location.pathname);
  }, []);

  let renderSwitch = (path) => {
    switch (path) {
      case "/":
        return <MovieList />;
      case "/top_rated":
        return <TopRatedMovies />;
      case "/upcoming":
        return <UpcomingMovies />;
      default:
        return;
    }
  };

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <div>
      {renderSwitch(window.location.pathname)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { loadCart })(MovieListContainer);
