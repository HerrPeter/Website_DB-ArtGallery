// -- 3rd Party Stuff -- //
import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "reactstrap";
import Select from "react-select";

// -- My stuff -- //
import ART_SERVER from "../misc/server-info";
import { RenderRowOne, RenderRecords } from "../components/table";

// -- CSS Styles -- //
import "../styles/pages/home.css";

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

  // Handle what happens when user selects option from dropdown menu (db tables).
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
        <div class="row">
          <div class="column">
            <Select
              value={db_options.table}
              options={ART_SERVER.database.tables}
              onChange={this.handleTableDropdownChange}
            />
          </div>
          <div class="column">
            <Button onClick={this.getArtGalleryData}>Run Search</Button>
          </div>
        </div>

        <Table bordered dark striped>
          <RenderRowOne columns={columns} />
          <RenderRecords columns={columns} records={records} />
        </Table>
      </div>
    );
  }
}
