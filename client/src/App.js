import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Cart from "./components/Cart/Cart";
import NavigationBar from "./components/Layout/NavigationBar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import MovieList from "./components/Movies/MovieList";
import Landing from "./components/Layout/Landing";
import { loadUser } from "./actions/auth";
import store from "./store";
import Alert from "./components/Layout/Alerts";
import MovieDetails from "./components/Movies/MovieDetails";
import Checkout from "./components/Cart/Checkout";
import TvShows from "./components/TvShows/TvShows";
import TvShowDetails from "./components/TvShows/TvShowDetails";
import TopRatedMovies from "./components/Movies/TopRatedMovies";
import UpcomingMovies from "./components/Movies/UpcomingMovies";
import { googleAuth } from "./actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./components/Spinner/LoadSpinner";
import { fetchItems } from "./actions/movie";
import "./App.css";

import { createBrowserHistory } from "history";
import MovieNav from "./components/Movies/MovieNav";

const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ authenticated }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    store.store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Router history={history}>
        <NavigationBar />
        <Alert />
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/register" component={Register} />
          <Route
            path="/login"
            component={!authenticated ? Login : MovieList}
          />
          <Route path="/tv_shows" component={TvShows} />
          <Route path="/movie_info/:id" component={MovieDetails} />
          <Route path="/upcoming" component={UpcomingMovies} />
          <Route path="/top_rated" component={TopRatedMovies} />
          <PrivateRoute path="/show_details" component={TvShowDetails} />
          <Route path="/cart" component={Cart} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route
            path=""
            component={() => (
              <h1 style={{ textAlign: "center", fontSize: "70px" }}>
                (404) Page not found.
              </h1>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(App);
