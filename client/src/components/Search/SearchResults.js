import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getSearchedMovie } from "../../actions/movie";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchResults = ({ results, getSearchedMovie }) => {
  // results = results.slice(0, 10);

  let searchResults = (
    <Container>
      <Scrollbars style={{ width: 700, height: 350 }}>
        {results && results.length !== 0 ? (
          results.map((result, key) => (
            <ListGroup style={{ width: "30rem", color: "black" }}>
              <Row>
                <Col key={results.id}>
                  <ListGroup.Item
                    action
                    href={`/movie_info/${result.id}`}
                    variant="light"
                    onClick={() => getSearchedMovie(result.id)}
                  >
                    <div>
                      <img
                        style={{ width: "5rem" }}
                        src={`https://image.tmdb.org/t/p/w154${[
                          result.poster_path,
                        ]}`}
                      />
                      <Col>
                        {result.title}
                        {` (${
                          result.release_date
                            ? moment(result.release_date).format("YYYY")
                            : "N/A"
                        })`}
                      </Col>
                    </div>
                  </ListGroup.Item>
                </Col>
              </Row>
            </ListGroup>
          ))
        ) : (
          <div>
            <div>No results found...</div>
          </div>
        )}
      </Scrollbars>
    </Container>
  );

  return <div>{searchResults}</div>;
  // return <div>{searchResults}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, getSearchedMovie })(
  SearchResults
);
