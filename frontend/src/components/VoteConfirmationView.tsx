import React, { Component } from "react";
import { Stack, Text, TextField, FontWeights } from "office-ui-fabric-react";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

type MyProps = {
  function: () => void;
};
type MyState = {};

export class VoteConfirmationView extends Component<MyProps, MyState> {
  render() {
    return (
      <div
        style={{ position: "relative", margin: "auto", textAlign: "center" }}
      >
        <Text
          variant="xxLarge"
          style={{
            margin: "auto",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Thank you for your vote
        </Text>
        <Text
          variant="large"
          block={true}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          Our maintenance team is on the way.
        </Text>
        <Text
          variant="large"
          block={true}
          style={{ marginTop: "10px", textAlign: "center" }}
        >
          Have a nice day!{" "}
        </Text>
      </div>
    );
  }
}

export default VoteConfirmationView;
