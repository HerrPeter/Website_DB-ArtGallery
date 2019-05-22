import React from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "reactjs-bootstrap-table";
require("bootstrap/dist/css/bootstrap.css");

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      columns: []
    };
  }

  componentDidMount() {
    this.getArtists();
  }

  getArtists = () => {
    fetch("http://192.168.0.21:4000/artists?name=halIE+tuft")
      .then(response => response.json())
      .then(({ data, columns }) => {
        this.setState({ results: data, columns: columns });
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  // Custom draw row for one artist.
  renderArtist = ({ artist_id, name }) => {
    return <p key={artist_id}>{`Id: ${artist_id} Name: ${name}`}</p>;
  };

  // Custom draw first row of a table.
  renderRowOne = (col, index) => {
    return <col key={index}>{col.name}</col>;
  };

  render() {
    return (
      <div>
        <h1>Art Show Gallery Database</h1>
        <BootstrapTable
          headers={true}
          columns={[{ name: "artist_id" }, { name: "name" }]}
          data={this.state.results}
        />

        {/* Works but is replaced by BootstrapTable. */}
        {/* <div>
          {this.state.results.map(currItem => this.renderArtist(currItem))}
        </div> */}

        <Button onClick={() => this.getArtists()}>Click Me</Button>
      </div>
    );
  }
}
