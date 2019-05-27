import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "reactstrap";
import Select from "react-select";

// -- My stuff -- //
import ART_SERVER from "../misc/server-info";
import { RenderRowOne, RenderRecords } from "../components/table";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      columns: [],
      db_options: {
        table: null
      }
    };
  }

  componentDidMount() {
    this.getArtGalleryData();
  }

  // FETCH Req: Get data from DB given user selected options (i.e. Table).
  getArtGalleryData = () => {
    const { table } = this.state.db_options;
    if (!table) {
      return;
    }

    // Encode query (INCOMPLETE).
    //const query = btoa(`table=${table.value}`);
    const query = `table=${table.value}`;

    fetch(`${ART_SERVER.host}/artists?${query}`)
      .then(response => response.json())
      .then(({ data, columns }) => {
        this.setState({ records: data, columns: columns });
        console.log(`FETCHED Data:`);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        alert("Unable to reach server (Get Technical Support).");
      });
  };

  // Custom draw row for one artist.
  renderArtist = ({ artist_id, name }) => {
    return <p key={artist_id}>{`Id: ${artist_id} Name: ${name}`}</p>;
  };

  handleTableDropdownChange = selected => {
    this.setState({
      db_options: {
        table: selected
      }
    });
  };

  render() {
    const { records, columns, db_options } = this.state;

    return (
      <div>
        <h1>Art Show Gallery Database</h1>
        <div>
          <Select
            value={db_options.table}
            options={[
              { value: "Artist", label: "Artist Table" },
              { value: "ArtWork", label: "ArtWork Table" }
            ]}
            onChange={this.handleTableDropdownChange}
          />
        </div>

        <Table bordered dark striped>
          <RenderRowOne columns={columns} />
          <RenderRecords columns={columns} records={records} />
        </Table>

        <Button onClick={this.getArtGalleryData}>Run Search</Button>
      </div>
    );
  }
}
