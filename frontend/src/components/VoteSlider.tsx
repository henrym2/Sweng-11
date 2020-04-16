import React, { Component } from "react";
import { Stack } from "office-ui-fabric-react";
import { render } from "react-dom";
import { VoteSliderHorizontal } from "./VoteSliderHorizontal";
import { VoteSliderVertical } from "./VoteSliderVertical";

export type VoteProps = {
  function: (opinion: number) => void; // Function called on change of value of the VoteSlider
};

// Values used by screen readers when reading the value of the vote slider
export const values = [
  "Too Cold",
  "A Bit Cold",
  "Just Right",
  "A Bit Hot",
  "Too Hot",
];

//This component controls whether to show a voting slider for mobile or desktop
export class VoteSlider extends Component<VoteProps> {
  currentView() {
    return isMobile() ? (
      <VoteSliderVertical function={this.props.function} />
    ) : (
      <VoteSliderHorizontal function={this.props.function} />
    );
  }

  render() {
    return (
      <Stack
        styles={{
          root: {
            width: "100%",
          },
        }}
      >
        {this.currentView()}
      </Stack>
    );
  }
}

// Determines if the user is on a mobile device based on the ratio of width to the height of the window.
function isMobile() {
  return window.innerHeight > 1.6 * window.innerWidth;
}
