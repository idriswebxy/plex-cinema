const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "8fb61d9f021e57975ac7a2ef25b640a7";

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = "w1280";

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = "w780";

const REACT_APP_AUTH0_CALLBACK_URI = "http://localhost:3000/movies";
const REACT_APP_AUTH0_DOMAIN = "twilight-bonus-1388.us.auth0.com";
const REACT_APP_AUTH0_CLIENT_ID = "Z1GHe0STO0EOcJ6Bsaj590A9rhCbuOpx";
const REACT_APP_AUTH0_AUDIENCE = "https://express.sample";
const REACT_APP_SERVER_URL = "http://localhost:5000";


export {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_SERVER_URL,
  REACT_APP_AUTH0_CALLBACK_URI,
};
