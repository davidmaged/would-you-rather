import React, { Component } from "react";
import { connect } from "react-redux";

export class LeaderBoard extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <h3 className="center">Leader Board</h3>
        {users
          .sort(
            (user1, user2) =>
              user2.questions.length +
              Object.keys(user2.answers).length -
              (user1.questions.length + Object.keys(user1.answers).length)
          )
          .map((user) => (
            <div key={user.id} className="question">
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className="avatar"
              />
              <div className="question-info">
                <div>
                  <span>{user.name}</span>
                  <p>Questions Asked: {user.questions.length}</p>
                  <p>Questions Answerd: {Object.keys(user.answers).length}</p>
                </div>
              </div>
              <div className="score">
                {user.questions.length + Object.keys(user.answers).length}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

function mapStatetoProps({ users }) {
  const us = [];
  Object.keys(users).map((user) => us.push(users[user]));
  return {
    users: us,
  };
}

export default connect(mapStatetoProps)(LeaderBoard);
