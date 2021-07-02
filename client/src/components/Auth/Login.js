import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Spinner from "../Spinner/LoadSpinner";
import GoogleButton from "react-google-button";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import Form from "react-bootstrap/Form";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import { setAlert } from "../../actions/alert";
import { cartItems } from "../../actions/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    color: "white",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({
  login,
  authenticated,
  loading,
  setAlert,
  logCheck,
  cartItems,
  guestCart,
}) => {
  const { isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  useEffect(() => {
    console.log(guestCart)
  }, [])

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.type]: e.target.value });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    // cartItems(guestCart);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container onSubmit={(e) => onSubmit(e)} component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  page: state.movie.page,
  loading: state.auth.loading,
  logCheck: state.auth.logCheck,
  guestCart: state.cart.guestCart,
});

export default connect(mapStateToProps, { login, setAlert, cartItems })(Login);
