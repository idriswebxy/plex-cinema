import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Spinner/LoadSpinner";
import { API_URL, API_KEY, POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../actions/movie";
import MovieList from "../Movies/MovieList";


const Landing = ({ login, authenticated, loading, movies, fetchItems }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const { isLoading, isAuthenticated } = useAuth0();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // if (authenticated || isAuthenticated) {
  //   return <Redirect to="/movies" />;
  // }

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div>
      <MovieList />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  loading: state.auth.loading,
  movies: state.movie.movies,
});

export default connect(mapStateToProps, { login, fetchItems })(Landing);
  