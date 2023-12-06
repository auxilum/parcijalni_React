import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import NoUser from "./NoUser";

const Results = ({ text }) => {
  const [data, setData] = useState({});
  const [repos, setRepos] = useState([]);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`https://api.github.com/users/${text}`)
      .then((response) => {
        // Handle successful response
        // console.log(response.data);

        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [text]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get(`https://api.github.com/users/${text}/repos`)
      .then((response) => {
        // Handle successful response
        console.log(response.data[0].name);

        setRepos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setNoUser(true);
      });
  }, [text]);

  return (
    <>
      {noUser ? (
        <NoUser />
      ) : (
        <div className="container">
          <Card>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col xs={6} md={4}>
                    <Image
                      style={{ width: 100, height: 100 }}
                      src={`${data.avatar_url}`}
                      rounded
                    />
                  </Col>

                  <Col className="contain" xs={6} md={4}>
                    <Card.Title>{data.name}</Card.Title>
                  </Col>
                </Row>
              </Card.Title>
              {data.bio === null ? (
                ""
              ) : (
                <Card.Text>
                  <span>BIO</span>: {data.bio}
                </Card.Text>
              )}

              {data.location === null ? (
                ""
              ) : (
                <Card.Text>
                  <span>LOCATION</span>: {data.location}
                </Card.Text>
              )}
              <Card.Text>
                <span>REPOSITORIES</span>:
                <ListGroup>
                  {repos.map((repo) => (
                    <ListGroup.Item key={repo.id}>{repo.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Results;
