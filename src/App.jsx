import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Results from "./components/Results";

function App() {
  const [initial, setInitial] = useState(true);
  const [text, setText] = useState("");

  const input = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInitial(false);
  };

  const goBack = () => {
    setInitial(true);
  };

  return (
    <>
      {initial ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>GitHub username</Form.Label>
            <Form.Control
              onChange={input}
              type="text"
              placeholder="e.g. facebook"
            />
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Search
          </Button>
        </Form>
      ) : (
        ""
      )}
      {!initial ? (
        <div className="contain2">
          <Results text={text} />
          <Button onClick={goBack}>Back</Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
