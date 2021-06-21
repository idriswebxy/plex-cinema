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
  fetchUpcomingMovies,
} from "../../actions/movie";
import { UPCOMING_MOVIES_URL } from "../../config/config";
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
import Button from "react-bootstrap/Button";
import CategoryNav from "../Layout/CategoryNav";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const styles = {
  padding: "10px",
  color: "black",
  textAlign: "center",
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

const UpcomingMovies = ({
  addToCart,
  loadCart,
  loading,
  movies,
  fetchUpcomingMovies,
  page,
  totalPages,
  loadMoreItems,
  authenticated,
  history,
}) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    fetchUpcomingMovies(UPCOMING_MOVIES_URL);
  }, []);

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <Container>
      <Row>
        {movies.map((movie, key) => (
          <Col key={key} xs={6} sm={3} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.moviesUpcoming,
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
  totalPages: state.movie.totalPages,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  nextPage,
  prevPage,
  loadMovies,
  fetchUpcomingMovies,
  loadMoreItems,
})(UpcomingMovies);
