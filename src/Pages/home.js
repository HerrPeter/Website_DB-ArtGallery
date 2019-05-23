import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "reactstrap";

// -- My stuff -- //
import ART_SERVER from "../misc/server-info";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      columns: []
    };
  }

  componentDidMount() {
    this.getArtists();
  }

  getArtists = () => {
    fetch(`${ART_SERVER.host}/artists`)
      .then(response => response.json())
      .then(({ data, columns }) => {
        this.setState({ records: data, columns: columns });
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

  render() {
    var { records, columns } = this.state;

    return (
      <div>
        <h1>Art Show Gallery Database</h1>

        <Table bordered dark striped>
          <RenderRowOne columns={columns} />
          <RenderRecords columns={columns} records={records} />
        </Table>

        <Button onClick={() => this.getArtists()}>Click Me</Button>
      </div>
    );
  }
}

// Custom draw: First row of a table.
function RenderRowOne(props) {
  var { columns } = props;
  if (columns === null) {
    console.log("No column data");
    return;
  }

  return (
    <thead>
      <tr>
        {columns.map((column, index) =>
          _renderHeadCol({ colName: column.name, index })
        )}
      </tr>
    </thead>
  );
}

function _renderHeadCol(props) {
  return <th key={props.index}>{props.colName}</th>;
}

// Custom draw: Every every record with data to the table.
function RenderRecords(props) {
  var { records, columns } = props;
  if (!records || !columns) {
    console.log("No column or record data");
    return;
  }

  return (
    <tbody>
      {records.map((record, index) =>
        _renderRecordRow({
          record,
          columns,
          index
        })
      )}
    </tbody>
  );
}

function _renderRecordRow(props) {
  var { record, columns, index } = props;
  return (
    <tr key={index}>
      {/* \/\/ This is for bold first column values. */}
      {/* <th scope="row">{props.record.artist_id}</th> */}
      {columns.map((column, index) =>
        _renderRecordCol({ record, column, index })
      )}
    </tr>
  );
}

function _renderRecordCol(props) {
  var { index, record, column } = props;
  return <td key={index}>{record[column.name]}</td>;
}
