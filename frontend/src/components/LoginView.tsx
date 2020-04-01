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
  function: (name: string, employeeNumber: string) => void;
};
type MyState = {
  name: string;
  employeeNumber: string;
};

export class LoginView extends Component<MyProps, MyState> {
  state: MyState = {
    name: "",
    employeeNumber: ""
  };

  render() {
    return (
      <>
        <TextField
          label="Login to submit a vote"
          placeholder="First Name"
          onChanged={this.onChanged}
        />
        <TextField
          label="Employee Number"
          placeholder="e.g. 18372936"
          onChanged={this.onChangedEmployeeNumber}
        />

        <p></p>
        <Button
          buttonType={ButtonType.primary}
          onClick={() =>
            this.props.function(this.state.name, this.state.employeeNumber)
          }
        >
          Log In
        </Button>
      </>
    );
  }

  onChanged = (newValue: string) => {
    this.setState({ name: newValue });
  };
  onChangedEmployeeNumber = (newValue: string) => {
    this.setState({ employeeNumber: newValue });
  };
}

export default LoginView;
