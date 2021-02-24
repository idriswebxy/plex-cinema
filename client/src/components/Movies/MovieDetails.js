import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "../../actions/cart";
import { loadMovieDetails, setMovie, getMovie, fetchCast } from "../../actions/movie";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import SpinnerPage from "../Spinner/LoadSpinner";
import { withRouter } from "react-router";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import StarRatings from "react-star-ratings";
import Button from "react-bootstrap/Button";



const styles = {
  container: { border: "8px solid black" },
  pad: {
    paddingTop: "10px",
  },
  row: {
    border: "3px dotted yellow",
  },
  mar: {
    margin: "20px",
  },
  colStyle: {
    border: "3px dotted red",
  },
};



const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  isLoading_app,
  voteAverage,
  withRouter,
  history,
}) => {
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [vidSpinner, setVidSpinner] = useState(true);
  
  const castFetch = async () => {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`)
    let data = await res.json();
    setCast([...cast, data.cast])
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setVidSpinner(false);
        setVideoKey(data.results[0].key);
      });
    // fetchCast(movie.id)
    loadCart();
    castFetch()
    window.scrollTo(0,0)
    console.log(cast)
  }, []);





  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
        rgba(19, 38, 47, 0.7) 0%,
        rgba(9, 28, 37, 0.7) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxHeight: "100%",
      }}
    >

      <Container style={styles.pad}>
        <Row lg={12} md={12} sm={12} xs={12}>
          <Image
            rounded
            src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />

          <Col>
            <Col>
              <h3>{movie.title}</h3>
              <div>({moment(movie.release_date).format("YYYY")})</div>
              <StarRatings
                starRatedColor="yellow"
                numberOfStars={5}
                rating={movie.vote_average / 2}
                starDimension={"25"}
                name="rating"
              />
              &nbsp;({movie.vote_count})<p>{movie.overview}</p>
              {cast.map((actor) => (
                <Image
                  roudedCircle
                  src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                />
              ))}
            </Col>
          </Col>
        </Row>
        <Row>
          {vidSpinner ? (
            <SpinnerPage />
          ) : (
            <ReactPlayer
              playing={false}
              controls={true}
              url={`https://www.youtube.com/watch?v=${videoKey}`}
            />
          )}
        </Row>
      </Container>
    </div>
  );
};

MovieDetails.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
  isLoading_app: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, {
    addToCart,
    loadMovieDetails,
    getMovie,
    loadCart,
    fetchCast
  })(MovieDetails)
);
