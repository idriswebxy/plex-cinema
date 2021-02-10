import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

const LoadSpinner = () => {
  const style = { marginTop: "25%", marginLeft: "49%" };

  return (
    <Container>
      <div style={style}>
        <Spinner animation="border" variant="primary" />
      </div>
    </Container>
  );
};

export default LoadSpinner;
