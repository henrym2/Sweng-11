import React, { Component } from "react";
import {
  FontSizes,
} from 'office-ui-fabric-react/lib/Styling';
import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  IStackTokens,
  Button,
  TextField,
  ButtonType,
  Label
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
        <Text
          variant="xLarge"
          style={{
            fontWeight: "bold",
          }}>
          Sign in
        </Text>
        <p></p>
        <TextField
          placeholder="First Name"
          onChanged={this.onChanged}
          underlined
        />
        <Button
          buttonType={ButtonType.primary}
          onClick={() => this.props.function(this.state.name)}
          style={{
            marginTop: "40px"
          }}
        >
          Sign in
        </Button>
      </>
    );
  }

  onChanged = (newValue: string) => {
    this.setState({ name: newValue });
  };
  
}

export default LoginView;
