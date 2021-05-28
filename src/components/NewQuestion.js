import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

export class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChange = (e) => {
    const text = e.target.value;
    if (e.target.id === "1") {
      this.setState(() => ({
        optionOneText: text,
      }));
    } else {
      this.setState(() => ({
        optionTwoText: text,
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: id ? false : true,
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const textOneLeft = 100 - optionOneText.length;
    const textTwoLeft = 100 - optionTwoText.length;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3 className="center">Compose new Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <h4>Would you rather?</h4>
          <textarea
            id="1"
            placeholder="Option One"
            value={optionOneText}
            onChange={this.handleChange}
            className="textarea"
            maxLength={100}
          />
          {textOneLeft <= 50 && (
            <div className="question-length">{textOneLeft}</div>
          )}
          <textarea
            id="2"
            placeholder="Option Two"
            value={optionTwoText}
            onChange={this.handleChange}
            className="textarea"
            maxLength={100}
          />
          {textTwoLeft <= 50 && (
            <div className="question-length">{textTwoLeft}</div>
          )}
          <button
            className="btn-q"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
