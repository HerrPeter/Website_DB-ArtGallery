// -- 3rd Party Stuff -- //
import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "reactstrap";
import Select from "react-select";

// -- My stuff -- //
import { ART_SERVER } from "../misc/server-info";
import { RenderRowOne, RenderRecords } from "../components/table";

// -- CSS Styles -- //
import "../styles/pages/home.css";
import '../styles/components/inputStyles.css';

// -- Home Page Class -- //
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      columns: [],
      db_options: {
        table: null,
        column: null,
        searchVal: '',
      },
      columnOptions: ART_SERVER.database.tables[0].columns,
    };
  }

  // FETCH Req: Get data from DB given user selected options (i.e. Table).
  runSearch = () => {
    const { table, column, searchVal } = this.state.db_options;
    if (!table) {
      console.log('No db table selected.')
      return;
    } else if (!column) {
      console.log('No table column selected.');
      return;
    } else if (!searchVal) {
      console.log('No search value.')
      return;
    }

    // Encode query (INCOMPLETE).
    //const query = btoa(`table=${table.value}`);
    const query = `table=${table.value}&searchCol=${column.value}&searchVal=${searchVal}`;

    fetch(`${ART_SERVER.host}/ag_db/search?${query}`)
      .then(response => response.json())
      .then(({ data, columns }) => {
        this.setState({ records: data, columns: columns });
      })
      .catch(err => {
        console.log(err);
        alert("Unable to reach server (Get Technical Support).");
      });
  };

  // Handle table dropdown component changes.
  handleTableDropdownChange = async selected => {
    let colOptions = ART_SERVER.database.tables[0].columns;

    // Fetch/Cache column data.
    if (ART_SERVER.database.tables[selected.index].columns.length === 0) {
      // Fetch the column data.
      let columns = await this.getColumnsArrayAsync(selected.value);
      if (columns) {
        colOptions = columns;
        ART_SERVER.database.tables[selected.index].columns = columns;
      }
    } else {
      // Just change to the active column data.
      colOptions = ART_SERVER.database.tables[selected.index].columns;
    }
    // Update the state of the home page.
    let db_options = this.state.db_options;
    db_options.table = selected;
    db_options.column = null;
    this.setState({
      db_options: db_options,
      columnOptions: colOptions,
    });
  };

  // Get columns from DB for selected table.
  getColumnsArrayAsync = async selectedTable => {
    let columns = null;
    try {
      let response = await fetch(`${ART_SERVER.host}/ag_db?table=${selectedTable}`);
      let { data } = await response.json();
      columns = data.map((columnData) => {
        if (columnData.Field) {
          return { value: columnData.Field, label: columnData.Field };
        }
      });
    } catch (err) {
      console.log(err);
      return null;
    }

    return columns;
  }

  // Handle column dropdown component changes.
  handleColDropdownChange = selected => {
    // NOTE: This preserves the adjacent db_options params within the state var.
    let db_options = this.state.db_options;
    db_options.column = selected;

    this.setState({
      db_options: db_options
    })
  }

  // Handle text input changes for search value.
  handleSearchInputChange = stuff => {
    let db_options = this.state.db_options;
    db_options.searchVal = stuff.target.value;
    db_options.searchVal = db_options.searchVal.replace(' ', '+');

    this.setState({
      db_options: db_options
    })
  }

  render() {
    const { records, columns, db_options, columnOptions } = this.state;

    return (
      <div>
        <h1>Art Show Gallery Database</h1>
        <div className="row">
          <div className="column">
            <Select
              value={db_options.table}
              options={ART_SERVER.database.tables}
              onChange={this.handleTableDropdownChange}
              placeholder='Select DB Table'
            />
          </div>
          <div className="column">
            <Select
              value={db_options.column}
              options={columnOptions}
              onChange={this.handleColDropdownChange}
              placeholder='Select Table Column'
            />
          </div>
        </div>

        <div className='row'>
          <div className='column'>
            <input className='textInput' onChange={this.handleSearchInputChange} value={this.state.text} placeholder='Search Value' />
            <Button id='buttonInput' onClick={this.runSearch}>Run Search</Button>
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