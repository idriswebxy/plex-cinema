import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

const LoadSpinner = () => {
  const style = { align: "center", marginTop: '30%' };

  return (
    <Container>
      <div style={style}>
        <Spinner animation="border" variant="primary" />
      </div>
    </Container>
  );
};

export default LoadSpinner;
