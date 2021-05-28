import React, { Component } from "react";
import { connect } from "react-redux";

import { setAuthedUser } from "../actions/authedUser";

export class Login extends Component {
  state = {
    authedUser: "",
  };

  onUserSelectChange = (e) => {
    const authedUser = e.currentTarget.value;
    this.setState(() => ({ authedUser }));
  };

  login = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    if (this.state.authedUser.length) {
      dispatch(setAuthedUser(this.state.authedUser));
      this.props.history.push("/");
    } else {
      alert("Please Select user first");
    }
  };

  render() {
    const { users } = this.props;
    const usersNew = Object.keys(users).map((userId) => ({
      avatarURL: users[userId].avatarURL,
      id: users[userId].id,
      name: users[userId].name,
    }));

    return (
      <div>
        <h3 className="center">Login to would you rather</h3>
        <div className="question">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => this.onUserSelectChange(e)}
          >
            <option defaultValue>select user</option>
            {users &&
              usersNew.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <button
            className="btn btn-primary login-btn"
            onClick={(e) => this.login(e)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
