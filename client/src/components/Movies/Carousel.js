import React from "react";
import { connect } from "react-redux";
import { fetchItems } from "../../actions/movie";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/Col";

const styles = {
  display: "block",
  maxHeight: "500px",
  maxWidth: "1280px",
  width: "auto",
  height: "auto",
};

const CarouselSlide = ({ movies }) => {
  return (
    <Carousel fluid>
      {movies.map((movie) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={styles}
            src={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
});

export default connect(mapStateToProps, {
  fetchItems,
})(CarouselSlide);
