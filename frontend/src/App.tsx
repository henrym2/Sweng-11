import React from "react";
import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";
import { UserSubmissionPage } from "./components/UserSubmissionPage";
import { AdminPage } from "./components/AdminPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserSubmissionPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
      </Switch>
    </Router>
  );
};
