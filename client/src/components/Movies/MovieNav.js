import React from "react";
import Nav from "react-bootstrap/Nav";


const styles = {
    padding: '10px'
}


const MovieNav = () => {
  return (
    <div style={styles}>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/">New Movies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/top_rated">Top Rated</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/upcoming">Upcoming</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default MovieNav;
