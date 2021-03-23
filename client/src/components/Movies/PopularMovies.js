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
} from "../../actions/movie";
import { API_URL, API_KEY } from "../../config";
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

const styles = {
  margin: "40px",
};

const PopularMovies = ({
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
}) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  let endpoint = "";

  useEffect(() => {
    if (movies.length < 20) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint);
      loadCart();
    } else {
      loadCart();
    }
  }, []);

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <div style={styles}>
      <Container>
        <SearchBar />
        <CategoryNav />
        <CarouselSlide />
        <Row>
          {movies.map((movie, key) => (
            <Col key={key} xs={6} sm={3} md={3} lg={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
        {/* {loading ? <LoadSpinner /> : null} */}
        {page < totalPages ? (
          <Button
            onClick={() => loadMoreItems(endpoint, page)}
            variant="primary"
            size="lg"
            block
          >
            Load More
          </Button>
        ) : null}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
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
  fetchItems,
  loadMoreItems,
})(PopularMovies);
