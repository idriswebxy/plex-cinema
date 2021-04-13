import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getSearchedMovie } from "../../actions/movie";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchResults = ({ results, getSearchedMovie }) => {
  results = results.slice(0, 10);

  let searchResults = (
    <Container>
      <Scrollbars style={{ width: 700, height: 350 }}>
        {results && results.length !== 0 ? (
          results.map((result, key) => (
            <ListGroup style={{ width: "30rem" }}>
              <Row>
                <Col key={key}>
                  <Link 
                    to={`/movie_info/${result.id}`}
                    onClick={() => getSearchedMovie(result.id)}
                  >
                    <div
                      key={result.id}
                      style={{
                        color: "white",
                        padding: "10px",
                      }}
                    >
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
                  </Link>
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
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, getSearchedMovie })(
  SearchResults
);
