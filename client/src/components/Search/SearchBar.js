import { Pane } from "evergreen-ui";
import React, { useState, useEffect } from "react";

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
    <Pane>
      {/* <form className="form-inline mt-4 mb-4">
        <TextField
          id="standard-basic"
          label="Search movies..."
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          aria-label="Search"
          onChange={(e) => onChange(e)}
        />
      </form> */}
    </Pane>
  );
};

export default SearchBar;
