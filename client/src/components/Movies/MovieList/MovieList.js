import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/LoadSpinner";
import { addToCart, loadCart } from "../../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../../actions/movie";
import { API_URL, API_KEY } from "../../../config";
import { connect } from "react-redux";
import Movie from "../Movie";
import SearchBar from "../../Search/Search";
import { useAuth0 } from "@auth0/auth0-react";
import { useStyles } from "./movie-list-style";
import {
  Grid,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
} from "@material-ui/core";
import movie from "../../../reducers/movie";

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

  const classes = useStyles();

  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }

  // if (isLoading || loading) {
  //   return <Spinner />;
  // }

  const FormRow = () => (
    <div className={classes.root}>
      {movies.map((m, k) => (
        <Grid justify={"center"} container spacing={5}>
          <Grid item xs={6} item sm={6} item md={6} item lg={6}>
            <Paper className={classes.paper}>
              <img src={`http://image.tmdb.org/t/p/w185${m.poster_path}`} />
              <h4>{m.title}</h4>
            </Paper>
          </Grid>
        </Grid>
      ))}
    </div>
  );

  const movieList = (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
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
