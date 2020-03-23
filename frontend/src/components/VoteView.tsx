import React, { Component } from "react";
import {
  Stack,
  Text,
  FontWeights,
  PrimaryButton,
  Label,
  Slider,
  IStackItemStyles,
  textAreaProperties
} from "office-ui-fabric-react";
import { render } from "react-dom";

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
const labelStyle: IStackItemStyles = { root: { justifyContent: "center" } };

type MyProps = {
  function: (opinion: number) => void;
};
type MyState = {
  opinion: number;
};

export class VoteView extends Component<MyProps, MyState> {
  setVoteValue = (val: number) => {
    this.setState({ opinion: val });
  };

  state: MyState = {
    opinion: 0
  };

  render() {
    let values = [
      "Too Cold",
      "A Bit Cold",
      "Just Right",
      "A Bit Hot",
      "Too Hot"
    ];

    return (
      <form>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#605e5c"
          }
        }}
        gap={50}
      >
        <Stack>
          <Text variant="xxLarge">How is the current temperature?</Text>
        </Stack>
        <Stack
          horizontalAlign="center"
          styles={{
            root: {
              width: "100%"
            }
          }}
          gap={15}
        >
          <Stack
            horizontal
            horizontalAlign="space-between"
            styles={{
              root: {
                width: "100%"
              }
            }}
          >
            <Stack.Item align="stretch" styles={{ root: { width: "15%" } }}>
              <Stack>
                <Label styles={labelStyle}>Too Cold</Label>
                <Label styles={labelStyle}>|</Label>
              </Stack>
            </Stack.Item>
            <Stack.Item align="stretch" styles={{ root: { width: "15%" } }}>
              <Stack>
                <Label styles={labelStyle}>A Bit Cold</Label>
                <Label styles={labelStyle}>|</Label>
              </Stack>
            </Stack.Item>

            <Stack.Item align="stretch" styles={{ root: { width: "15%" } }}>
              <Stack>
                <Label styles={labelStyle}>Just Right</Label>
                <Label styles={labelStyle}>|</Label>
              </Stack>
            </Stack.Item>
            <Stack.Item align="stretch" styles={{ root: { width: "15%" } }}>
              <Stack>
                <Label styles={labelStyle}>A Bit Hot</Label>
                <Label styles={labelStyle}>|</Label>
              </Stack>
            </Stack.Item>
            <Stack.Item align="stretch" styles={{ root: { width: "15%" } }}>
              <Stack>
                <Label styles={labelStyle}>Too Hot</Label>
                <Label styles={labelStyle}>|</Label>
              </Stack>
            </Stack.Item>
          </Stack>
          <Stack
            styles={{
              root: {
                width: "88%"
              }
            }}
          >
            <Slider
              min={-2}
              max={2}
              defaultValue={0}
              // originFromZero={true}
              showValue={false}
              onChange={(val: number) => this.setVoteValue(val)}
              valueFormat={(value: number) => values[value + 2]}
            />
          </Stack>
        </Stack>
        <Stack>
          <PrimaryButton
            type="submit"
            text="Submit"
            onClick={() => this.props.function(this.state.opinion)}
          />
          
        </Stack>
      </Stack>
      </form>
    );
  }
}
export default VoteView;
