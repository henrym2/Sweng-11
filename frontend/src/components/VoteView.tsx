import React, { Component } from "react";
import {
  Stack,
  Text,
  FontWeights,
  PrimaryButton,
  Label,
  Slider,
  IStackItemStyles,
  textAreaProperties,
} from "office-ui-fabric-react";
import { render } from "react-dom";
import { VoteSlider } from "./VoteSlider";

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

type MyProps = {
  function: (opinion: number) => void;
};
type MyState = {
  opinion: number;
};

//This component displays the voting view to the user
//Determines whether it should show a verticle or horizontal slider (depending on desktop or mobile view)
export class VoteView extends Component<MyProps, MyState> {
  setVoteValue = (val: number) => {
    this.setState({ opinion: val });
  };

  state: MyState = {
    opinion: 0,
  };

  render() {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#605e5c",
          },
        }}
        gap={50}
      >
        <Stack>
          <Text variant="xxLarge">How is the current temperature?</Text>
        </Stack>
        <VoteSlider function={this.setVoteValue} />
        <Stack>
          <PrimaryButton
            text="Submit"
            onClick={() => this.props.function(this.state.opinion)}
          />
        </Stack>
      </Stack>
    );
  }
}
export default VoteView;
