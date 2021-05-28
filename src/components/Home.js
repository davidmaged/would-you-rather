import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/questions/:id" component={QuestionPage} />
          <Route path="/add" component={NewQuestion} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(Home);
