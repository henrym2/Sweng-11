import React from "react";
import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";
import { UserSubmissionPage } from "./components/UserSubmissionPage";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => {
  return <UserSubmissionPage />;
};
