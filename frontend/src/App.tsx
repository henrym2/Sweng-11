import React, { Component } from "react";
import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";
import { initializeIcons } from "@uifabric/icons";
import { UserSubmissionPage } from "./components/UserSubmissionPage";
import { AdminPage } from "./components/AdminPage";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from "react-router-dom";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

initializeIcons();

interface Props extends RouteComponentProps<any> {
  /* Parent component's props*/
}

export class App extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
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
  }
}

export default App;
