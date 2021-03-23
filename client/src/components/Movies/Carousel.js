import React from "react";
import { connect } from "react-redux";
import { fetchItems } from "../../actions/movie";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/Col";

const styles = {
  height: "400px",
};

const CarouselSlide = ({ movies }) => {
  let demoPage = (
    <Carousel>
      {movies.map((movie) => (
        <Carousel.Item>
          <Image
            rounded
            className="d-block w-100"
            src={`http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          />
          <Carousel.Caption>
            <h4>{movie.title}</h4>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return <div>{demoPage}</div>;
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
});

export default connect(mapStateToProps, {
  fetchItems,
})(CarouselSlide);
