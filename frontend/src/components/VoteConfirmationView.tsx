import React, { Component } from "react";
import {
  Stack,
  Text,
  TextField,
  FontWeights,
  Button
} from "office-ui-fabric-react";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

type MyProps = {
  function: () => void;
};
type MyState = {};

export class VoteConfirmationView extends Component<MyProps, MyState> {
  render() {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: "960px",
            margin: "0 auto",
            textAlign: "center",
            color: "#605e5c"
          }
        }}
        gap={15}
      >
        {/* Insert Code Here */}
      </Stack>
    );
  }
}
export default VoteConfirmationView;
