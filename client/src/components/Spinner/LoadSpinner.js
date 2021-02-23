import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

const LoadSpinner = () => {
  const style = { marginLeft: "45%", marginTop: "30%", marginBottom: "10%" };

  return (
    <Container>
      <div style={style}>
        <Spinner animation="border" variant="primary" />
      </div>
    </Container>
  );
};

export default LoadSpinner;
