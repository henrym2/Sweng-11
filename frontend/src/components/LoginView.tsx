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
      <form
      onSubmit={() => {}}>
        <TextField
          label="Login to submit a vote"
          placeholder="First Name"
          onChanged={this.onChanged}
        />
        <p></p>
        <TextField
        placeholder="Employee number">
        </TextField>
        <p></p>
        <Button
          type="submit"
          buttonType={ButtonType.primary}
          onClick={() => this.props.function(this.state.name)}
        >
          Log In
        </Button>
        </form>
      </>
    );
  }

  onChanged = (newValue: string) => {
    this.setState({ name: newValue });
  };
}

export default LoginView;
