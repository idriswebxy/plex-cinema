import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const SearchBar = ({ onSearch, hideResults }) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    hideResults(term);
  }, [term]);

  const onChange = (e) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <Form.Group>
        <Form.Control
          size="md"
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => onChange(e)}
        ></Form.Control>
      </Form.Group>
    </div>
  );
};

export default SearchBar;
