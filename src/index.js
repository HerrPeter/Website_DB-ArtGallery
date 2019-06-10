import React from "react";
import ReactDOM from "react-dom";

// -- My Stuff --//
import Home from "./pages/home.js";
import "./styles/index.css";

class Index extends React.Component {
  render() {
    return <Home />;
  }
}

// ========================================

ReactDOM.render(<Index />, document.getElementById("root"));
