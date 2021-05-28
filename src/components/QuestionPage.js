import React, { Component } from "react";
import { connect } from "react-redux";

import { formatDate } from "../utils/helper";
import { handleAnswerQuestion } from "../actions/questions";
import { Redirect } from "react-router";

export class QuestionPage extends Component {
  state = {
    option: "",
    toHome: false,
  };
  onValueChange = (e) => {
    const option = e.currentTarget.value;
    this.setState(() => ({
      option,
    }));
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { authedUser, id, dispatch } = this.props;
    const ret = { authedUser, qid: id, answer: this.state.option };
    dispatch(handleAnswerQuestion(ret));
    this.setState(() => ({
      option: "",
      toHome: true,
    }));
  };

  render() {
    const { questionInfo, answerd } = this.props;
    const { avatarURL, name, timestamp, optionOne, optionTwo } = questionInfo;
    const firstOption = { ...optionOne };
    const secondOption = { ...optionTwo };
    const votes1 = Object.keys({ ...firstOption.votes }).length;
    const votes2 = Object.keys({ ...secondOption.votes }).length;
    const perc1 = (votes1 / (votes1 + votes2)) * 100;
    const perc2 = (votes2 / (votes1 + votes2)) * 100;

    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="question">
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          <div className="question-info">
            <div>
              <span>{name} asks would you rather</span>
              <div>{formatDate(timestamp)}</div>
              {!answerd ? (
                <form onSubmit={this.formSubmit}>
                  <div className="radio">
                    <input
                      type="radio"
                      value="optionOne"
                      style={{ marginRight: 10 }}
                      checked={this.state.option === "optionOne"}
                      onChange={this.onValueChange}
                    />
                    <label>Option one: {firstOption.text}</label>
                  </div>
                  <div className="radio">
                    <input
                      type="radio"
                      value="optionTwo"
                      style={{ marginRight: 10 }}
                      checked={this.state.option === "optionTwo"}
                      onChange={this.onValueChange}
                    />
                    <label>Option two: {secondOption.text}</label>
                  </div>
                  <button className="btn-q" type="submit">
                    Submit
                  </button>
                </form>
              ) : (
                <div>
                  <p className={answerd === "optionOne" ? "text-strike" : null}>
                    {votes1} chose option one: {firstOption.text} {perc1}%
                  </p>
                  <p className={answerd === "optionTwo" ? "text-strike" : null}>
                    {votes2} chose option two: {secondOption.text} {perc2}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const { author } = { ...question };
  const { name, avatarURL } = { ...users[author] };

  const { answers } = { ...users[authedUser] };
  const answerd = answers[id];

  const questionInfo = {
    name,
    avatarURL,
    ...question,
  };

  return {
    authedUser,
    questionInfo,
    answerd,
    id,
  };
}

export default connect(mapStateToProps)(QuestionPage);
