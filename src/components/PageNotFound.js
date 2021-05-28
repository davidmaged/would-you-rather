import React, { Component } from "react";
import { Link } from "react-router-dom";

export class PageNotFound extends Component {
  render() {
    return (
      <div className="center">
        <p>404 Page Not Found</p>
        <Link to="/">Go to Home </Link>
      </div>
    );
  }
}

export default PageNotFound;
