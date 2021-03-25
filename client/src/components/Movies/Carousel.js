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
    <div>
      <Carousel interval={3000}>
        {movies.map((movie) => (
          <Carousel.Item>
            <Image
              style={{
                backgroundImage: `linear-gradient(to right,
        rgba(19, 38, 47, 0.7) 0%,
        rgba(9, 28, 37, 0.7) 100%)`,

                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                maxHeight: "100%",
              }}
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
