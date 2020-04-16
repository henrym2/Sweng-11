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
import { VoteProps, values } from "./VoteSlider";

//The Vote Slider Component - Vertical version for mobile viewing
export class VoteSliderVertical extends Component<VoteProps> {
  render() {
    return (
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        styles={{
          root: {
            width: "100%",
            height: "200px",
          },
        }}
      >
        <Stack
          id="slider"
          styles={{
            root: {
              height: "100%",
            },
          }}
        >
          <Slider
            vertical
            min={-2}
            max={2}
            defaultValue={0}
            showValue={false}
            onChange={(val: number) => this.props.function(val)}
            ariaValueText={(value: number) => values[value + 2]}
            valueFormat={(value: number) => values[value + 2]}
            styles={{
              root: {
                height: "96%",
              },
            }}
          />
        </Stack>
        <Stack
          verticalFill
          verticalAlign="space-between"
          horizontalAlign="start"
          styles={{
            root: {
              //height:'100%'
            },
          }}
        >
          <Label>─ Too Hot</Label>
          <Label>─ A Bit Hot</Label>
          <Label>─ Just Right</Label>
          <Label>─ A Bit Cold</Label>
          <Label>─ Too Cold</Label>
        </Stack>
      </Stack>
    );
  }
}
