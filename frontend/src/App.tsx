<<<<<<< HEAD
import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import {LoginView} from "./components/LoginView";
=======
import React from "react";
import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";
import { UserSubmissionPage } from "./components/UserSubmissionPage";
import { AdminPage } from "./components/AdminPage";
>>>>>>> 3fc092f875450e51bf622a4f3e44c98d9ce1c093

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => {
  return (
<<<<<<< HEAD
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c'
        }
      }}
      gap={15}
    >
    <LoginView/>
    </Stack>
=======
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
>>>>>>> 3fc092f875450e51bf622a4f3e44c98d9ce1c093
  );
};
