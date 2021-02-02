import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../actions/movie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL, API_KEY } from "../../config";
import "./MovieList.css";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchBar from "../Search/Search";
import { useAuth0 } from "@auth0/auth0-react";

const MovieList = ({
  addToCart,
  loadCart,
  loading,
  movies,
  fetchItems,
  page,
  totalPages,
  loadMoreItems,
  authenticated,
}) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  let endpoint = "";

  useEffect(() => {
    if (movies.length <= 20) {
      endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint);
      loadCart();
    } else {
      loadCart();
    }
  }, []);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (isLoading || loading) {
    return <Spinner />;
  }


  const movieList = (
    // <Container>
    //   <div className="rmdb-home">
    //     <div className="rmdb-home-grid">
    //       <Row>
    //         {movies.map((movie, key) => {
    //           return (
    //             <Col key={key} md="3">
    //               <Movie
    //                 id={movie.id}
    //                 addToCart={addToCart}
    //                 title={movie.title}
    //                 image={movie.poster_path}
    //                 overview={movie.overview}
    //                 releaseDate={movie.release_date}
    //                 price={2.99}
    //                 movieObj={movie}
    //               />
    //             </Col>
    //           );
    //         })}
    //       </Row>
    //       {loading || isLoading ? <Spinner /> : null}
    //       {page <= totalPages && (!isLoading || loading) ? (
    //         <LoadMoreBtn
    //           text="Load More"
    //           onClick={() => loadMoreItems(endpoint, page)}
    //         />
    //       ) : null}
    //     </div>
    //   </div>
    // </Container>
    <div>404</div>
  );

  return (
    <div>
      <SearchBar />
      {/* {carousel} */}
      {movieList}
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
  loadChange,
  loadMoreItems,
})(MovieList);
