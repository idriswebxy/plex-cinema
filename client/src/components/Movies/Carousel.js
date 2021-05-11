import React from "react";
import { connect } from "react-redux";
import { fetchItems, getMovie } from "../../actions/movie";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/Col";

const styles = {
  height: "200px",
  gradient: {
    background: "linear-gradient(to top, #260a42, #2b2c2c)",
  },
};

const CarouselSlide = ({ movies }) => {
  let demoPage = (
    <div>
      <Carousel interval={4000}>
        {movies.map((movie, key) => (
          <Carousel.Item key={key}>
            <Image
              style={styles.gradient}
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
    </div>
  );

  return <div>{demoPage}</div>;
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
});

export default connect(mapStateToProps, {
  fetchItems,
})(CarouselSlide);
