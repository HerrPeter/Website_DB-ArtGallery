import React from "react";
import { Button } from "react-bootstrap";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: "Nothing"
    };
  }

  componentDidMount() {
    this.getArtists();
  }

  getArtists = () => {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ results: data });
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Art Show Gallery (Database)</h1>
        <h3>{this.state.results}</h3>
        <Button onClick={() => alert("click")}>Click Me</Button>
      </div>
    );
  }
}
