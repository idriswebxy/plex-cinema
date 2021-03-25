import React from "react";
import Nav from 'react-bootstrap/Nav'

const styles = {
    margin: '30px',
    color: 'white'
}


const CategoryNav = () => {
  return (
    <div style={styles}>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link href="/">Now Playing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/popular">Popular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/upcoming">Upcoming</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default CategoryNav;
