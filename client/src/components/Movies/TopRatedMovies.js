import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/LoadSpinner";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
  fetchTopRatedMovies,
} from "../../actions/movie";
import { TOP_RATED_MOVIES_URL } from "../../config/config";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Movie from "./MovieCard";
import SearchBar from "../Search/Search";
import { useAuth0 } from "@auth0/auth0-react";
import MovieCard from "./MovieCard";
import CarouselSlide from "./Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadSpinner from "../Spinner/LoadSpinner";
import Loader from "./Loader";
import Button from "react-bootstrap/Button";
import CategoryNav from "../Layout/CategoryNav";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const styles = {
  margin: "10px",
  color: "white"
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const TopRatedMovies = ({
  addToCart,
  loadCart,
  loading,
  movies,
  fetchItems,
  page,
  totalPages,
  loadMoreItems,
  authenticated,
  history,
  fetchTopRatedMovies,
}) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    fetchTopRatedMovies(TOP_RATED_MOVIES_URL);
  }, []);

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <div>
      <h4 style={styles}>Top Rated Movies</h4>
      <Carousel
        infinite={true}
        focusOnSelect={true}
        slidesToSlide={5}
        responsive={responsive}
        swipeable={true}
        showDots={true}
      >
        {movies.map((movie, key) => (
          <div key={key} style={styles}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.moviesTopRated,
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
  totalPages: state.movie.totalPages,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  loadMovies,
  nextPage,
  prevPage,
  fetchItems,
  loadMoreItems,
  fetchTopRatedMovies,
})(TopRatedMovies);
