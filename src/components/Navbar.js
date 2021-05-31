import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { removeAuthedUser } from "../actions/authedUser";

class Navbar extends Component {
  logout = (e) => {
    // e.preventDefault();
    const { dispatch } = this.props;
    dispatch(removeAuthedUser());
  };
  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
    return (
      <nav className="nav">
        <ul>
          <li style={{ color: "blue" }}>Welcome {user.name}</li>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              activeClassName="active"
              onClick={(e) => this.logout(e)}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Navbar);
