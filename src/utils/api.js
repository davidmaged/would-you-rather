import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

// info format { authedUser, qid, answer }
export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

// question formate { optionOneText, optionTwoText, author}
export function saveQuestion(question) {
  return _saveQuestion(question);
}
