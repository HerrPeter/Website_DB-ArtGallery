import React from "react";

// Custom draw: First row of a table.
export function RenderRowOne(props) {
  var { columns } = props;
  if (!columns) {
    console.log("No column data");
    return <thead />;
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
export function RenderRecords(props) {
  var { records, columns } = props;
  if (!records) {
    console.log("No record data");
    return <tbody />;
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
