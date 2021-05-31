import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Dashboard extends Component {
  render() {
    const { answerdQuestionsIds, unanswerdQuestionsIds } = this.props;
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <div className="dashboard-container">
          <ul className="nav nav-tabs " id="myTab" role="tablist">
            <li className="nav-item  button-tab" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Unanswerd Questions
              </button>
            </li>
            <li className="nav-item  button-tab" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Answered Questions
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <ul className="dashboard-list">
                {unanswerdQuestionsIds.map((id) => (
                  <div key={id}>
                    <Question id={id} />
                  </div>
                ))}
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <ul className="dashboard-list">
                {answerdQuestionsIds.map((id) => (
                  <div key={id}>
                    <Question id={id} />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps({ users, questions, authedUser }) {
  const { answers } = { ...users[authedUser] };
  const questionsIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const answerdQuestionsIds = Object.keys({ ...answers }).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unanswerdQuestionsIds = questionsIds.filter(
    (question) => !answerdQuestionsIds.includes(question)
  );

  // const answerdQuestions = Object.keys(questions)
  //   .filter((key) => answerdQuestionsIds.includes(key))
  //   .reduce((obj, key) => {
  //     return {
  //       ...obj,
  //       [key]: questions[key],
  //     };
  //   }, {});

  // const unanswerdQuestions = Object.keys(questions)
  //   .filter((key) => unanswerdQuestionsIds.includes(key))
  //   .reduce((obj, key) => {
  //     return {
  //       ...obj,
  //       [key]: questions[key],
  //     };
  //   }, {});

  return {
    answers,
    answerdQuestionsIds,
    unanswerdQuestionsIds,
  };
}

export default connect(mapStatetoProps)(Dashboard);
