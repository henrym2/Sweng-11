import React, { Component } from "react";
import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  IStackTokens,
  Button,
  TextField,
  ButtonType
} from "office-ui-fabric-react";

type MyProps = {
  function: (name: string) => void;
};
type MyState = {
  name: string;
};

export class LoginView extends Component<MyProps, MyState> {
  state: MyState = {
    name: ""
  };

  render() {
    return (
      <>
        <TextField
          label="Login to submit a vote"
          placeholder="First Name"
          onChanged={this.onChanged}
        />
        <TextField label="Employee Number" placeholder="e.g. 103829802" />
        <p></p>
        <Button
          buttonType={ButtonType.primary}
          onClick={() => this.props.function(this.state.name)}
        >
          Log In
        </Button>
      </>
    );
  }

  onChanged = (newValue: string) => {
    this.setState({ name: newValue });
  };
}

export default LoginView;
