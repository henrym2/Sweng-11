import React, { Component } from "react";
import { Stack, Label, Slider, IStackItemStyles } from "office-ui-fabric-react";
import { VoteProps, values } from "./VoteSlider";

const labelStyle: IStackItemStyles = { root: { justifyContent: "center" } };

//The Vote Slider Component - Horizontal version for desktop viewing
export class VoteSliderHorizontal extends Component<VoteProps> {
  render() {
    return (
      <Stack
        horizontalAlign="center"
        styles={{
          root: {
            width: "100%",
          },
        }}
        gap={15}
      >
        <Stack
          horizontal
          horizontalAlign="space-between"
          styles={{
            root: {
              width: "100%",
            },
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
              width: "88%",
            },
          }}
        >
          <Slider
            min={-2}
            max={2}
            defaultValue={0}
            showValue={false}
            onChange={(val: number) => this.props.function(val)}
            ariaValueText={(value: number) => values[value + 2]}
            valueFormat={(value: number) => values[value + 2]}
          />
        </Stack>
      </Stack>
    );
  }
}
