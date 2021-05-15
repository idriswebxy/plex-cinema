import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

const SearchBar = ({ onSearch, hideResults }) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    // hideResults(term);
  }, [term]);

  const onChange = (e) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Container>
      <Form.Group>
        <Form.Control
          size="md"
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => onChange(e)}
        ></Form.Control>
      </Form.Group>
    </Container>
  );
};

export default SearchBar;
