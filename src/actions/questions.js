import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { userAnswerQuestion, userAddQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(userAnswerQuestion({ authedUser, qid, answer }));
      dispatch(answerQuestion({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(userAddQuestion({ authedUser, qid: question.id }));
      dispatch(addQuestion(question));
      dispatch(hideLoading());
    });
  };
}
