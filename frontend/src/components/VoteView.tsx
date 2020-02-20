import React, { Component } from "react";
import {
  Stack,
  Text,
  TextField,
  FontWeights,
  Button,
  Label,
  Slider,
  IStackItemStyles
} from "office-ui-fabric-react";
import { render } from "react-dom";

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
const labelStyle: IStackItemStyles = { root: { justifyContent: "center" } };

type MyProps = {
  function: () => void;
};
type MyState = {};

export class VoteView extends Component<MyProps, MyState> {
  render() {
    let values = [
      "Too Cold",
      "A Bit Cold",
      "Just Right",
      "A Bit Hot",
      "Too Hot"
    ];

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
            color: "#605e5c"
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
              width: "86.75%"
            }
          }}
        >
          <Slider
            min={-2}
            max={2}
            defaultValue={0}
            originFromZero
            showValue={false}
            valueFormat={(value: number) => values[value + 2]}
          />
        </Stack>
      </Stack>
    );
  }
}
export default VoteView;
