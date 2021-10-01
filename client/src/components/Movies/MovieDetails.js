import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "../../actions/cart";
import {
  loadMovieDetails,
  setMovie,
  getMovie,
  fetchCast,
  fetchVideo,
} from "../../actions/movie";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import LoadSpinner from "../Spinner/LoadSpinner";
// import { withRouter } from "react-router";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config/config";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import StarRatings from "react-star-ratings";
import Button from "react-bootstrap/Button";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const styles = {
  container: { border: "8px solid black" },
  paddingTop: "16px",
  pad: {},
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

const UpdatingPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      console.log("updating!");
      popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Popover ref={ref} content {...props}>
        {children}
      </Popover>
    );
  }
);

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
  movieID,
  auth,
  cart,
  price = 2.99,
}) => {
  const [cast, setCast] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [vidSpinner, setVidSpinner] = useState(false);

  const fetchCast = async (id) => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(...cast, data.cast.slice(0, 6));
      });
  };

  const videoLoader = async (id) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          setVideoKey(data.results[0].key);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // setVidSpinner(false);
    fetchCast(movie.id);
    videoLoader(movie.id);
    loadCart(auth);
    window.scrollTo(0, 0);
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
        color: "white",
      }}
    >
      <Container>
        <Row style={styles}>
          <Image
            rounded
            src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />

          <Col>
            <Col>
              <h3>{movie.title}</h3>
              <div>
                Release Date: {moment(movie.release_date).format("YYYY")}
              </div>
              <StarRatings
                starRatedColor="yellow"
                numberOfStars={5}
                rating={movie.vote_average / 2}
                starDimension={"25px"}
                name="rating"
              />
              ({movie.vote_count})<p>{movie.overview}</p>
              <div>
                <OverlayTrigger
                  trigger="click"
                  overlay={
                    <UpdatingPopover id="popover-contained">
                      Item Added!
                    </UpdatingPopover>
                  }
                >
                  <Button onClick={() => addToCart(movie, auth, price)}>
                    Add To Cart <i class="bi bi-cart-plus-fill"></i>
                  </Button>
                </OverlayTrigger>
              </div>
              &nbsp; &nbsp; &nbsp;
              <Row>
                {cast.map((actor, key) => (
                  <Col key={key} xs={6} lg={2}>
                    <Image
                      rounded
                      src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                    />
                    <div>{actor.original_name}</div>({actor.character})
                  </Col>
                ))}
              </Row>
            </Col>
          </Col>
        </Row>
        &nbsp; &nbsp; &nbsp;
        <Row>
          {
            <ReactPlayer
              playing={false}
              controls={true}
              url={`https://www.youtube.com/watch?v=${videoKey}`}
            />
          }
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
  cast: state.movie.movieCast,
  videoKey: state.movie.videoKey,
  movieID: state.movie.movieId,
  auth: state.auth.authenticated,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
})(MovieDetails);
