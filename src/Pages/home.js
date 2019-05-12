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
        console.log(data);
      })
      .catch(err => console.log(err));

    // fetch("192.168.0.21/artists")
    //   .then(results => {
    //     results = results.json();
    //     console.log(results);
    //     return results;
    //   })
    //   .then(
    //     data => {
    //       let stuff = data;
    //       console.log("Succ...");
    //       console.log(stuff);
    //     },
    //     err => {
    //       console.log("Fail...");
    //       console.log(err);
    //     }
    //   );

    // fetch("www.project-jimbo.appspot.com/artists")
    //   .then(response => {
    //       console.log(`1) Response: ${response}`);
    //     response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => console.error(err));
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
