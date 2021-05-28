import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/helper";

class Question extends Component {
  // navigatToQustion = (e) => {
  //   e.preventDefault();
  // };

  render() {
    const { questionInfo } = this.props;
    const { avatarURL, name, timestamp, optionOne, optionTwo, id } =
      questionInfo;
    const firstOption = { ...optionOne }.text;
    const secondOption = { ...optionTwo }.text;

    return (
      <Link to={`/questions/${id}`} className="question">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <span>{name} ask would you rather</span>
            <div>{formatDate(timestamp)}</div>
            <p>Option one: {firstOption}</p>
            <p>Option two: {secondOption}</p>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const { author } = { ...question };
  const { name, avatarURL } = { ...users[author] };
  const questionInfo = {
    name,
    avatarURL,
    ...question,
  };

  return {
    authedUser,
    questionInfo,
  };
}

export default connect(mapStateToProps)(Question);
