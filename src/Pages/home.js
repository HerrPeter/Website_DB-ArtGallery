import React from "react";
import { Button } from "react-bootstrap";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: "Nothing"
    };
  }

  //   connectToDB = () => {
  //     console.log("Connecting...");
  //     const connection = SQL.createConnection({
  //       host: "35.222.200.150",
  //       user: "root",
  //       password: "root"
  //     });

  //     connection.connect(err => {
  //       if (err) {
  //         console.log(`Error Connecting: ${err}`);
  //         return;
  //       } else {
  //         // Success
  //         console.log(`Connected as ID: ${connection.threadId}`);
  //       }
  //     });
  //   };

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
