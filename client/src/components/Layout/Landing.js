import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Spinner/LoadSpinner";
import { Pane, Text } from "evergreen-ui";
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

  useEffect(() => {
    console.log(movies);
  }, [movies]);

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

  // if (loading || isLoading) {
  //   return <Spinner />;
  // }

  const landingPreview = (
    <Pane justifyContent="center">
      <Pane
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        flexDirection="inherit"
        padding={20}
        // height={"100%"}
        // width={"100%"}
      >
        {movies.map((movie) => (
          <Pane margin={10}>
            <img
              height={"100%"}
              width={"100%"}
              src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
            />
          </Pane>
        ))}
      </Pane>
    </Pane>
  );

  return <div>{landingPreview}</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  loading: state.auth.loading,
  movies: state.movie.movies,
});

export default connect(mapStateToProps, { login, fetchItems })(Landing);
