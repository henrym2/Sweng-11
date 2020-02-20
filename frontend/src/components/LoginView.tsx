import React, { Component } from "react";
import {
  Stack,
  Text,
  TextField,
  FontWeights,
  Button,
  DefaultButton,
  PrimaryButton,
  IStackTokens
} from "office-ui-fabric-react";

type MyProps = {
  function: () => void;
};
type MyState = {};

export class LoginView extends Component<MyProps, MyState> {
  state: MyState = {};

  render() {
    return (
      <>
        <div>Login here!!</div>
        <PrimaryButton
          text="Log in"
          onClick={() => this.props.function()}
          allowDisabledFocus
        />
      </>
    );
  }
}

export default LoginView;
