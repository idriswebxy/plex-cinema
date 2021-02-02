import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getSearchedMovie } from "../../actions/movie";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";

const SearchResults = ({ results, getSearchedMovie }) => {
  results = results.slice(0, 10);

  let searchResults = <div>404</div>;

  return <div>{searchResults}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, getSearchedMovie })(
  SearchResults
);
