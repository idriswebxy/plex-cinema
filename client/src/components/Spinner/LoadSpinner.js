import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));

const LoadSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadSpinner;
