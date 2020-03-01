import React, { Component } from "react";
import {
  Stack,
  Button,
  Text,
  TextField,
  FontWeights,
  ButtonType
} from "office-ui-fabric-react";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

type MyProps = {
  function: () => void;
  name: String;
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
          Thanks {this.props.name} for your vote
        </Text>
        <Text
          variant="large"
          block={true}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          Our maintenance team is on the way. Have a nice day!
        </Text>
        <p></p>
        <Button
          buttonType={ButtonType.primary}
          onClick={() => this.props.function()}
        >
          Retry
        </Button>
      </div>
    );
  }
}

export default VoteConfirmationView;
