import React, { Component } from "react";

import { Text, ITextStyles, FontWeights } from "office-ui-fabric-react";

type CardProps = {
  title: string;
  icon: string;
  color: string;
  switchDisplay: () => void;
};

export default class SideBarButton extends Component<CardProps> {
  titleStyles: ITextStyles = {
    root: {
      fontSize: 22,
      fontWeight: FontWeights.bold,
      margin: "auto",
      lineHeight: "100px",
    },
  };

  render() {
    return (
      <aside
        onClick={() => this.props.switchDisplay()}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100px",
          borderBottom: "1px solid #DCDCDC",
          backgroundColor: this.props.color,
          cursor: "grab",
        }}
      >
        <div style={{ margin: "auto" }}>
          <img
            src={this.props.icon}
            style={{
              width: "30px",
              marginRight: "15px",
            }}
          />
          <Text styles={this.titleStyles}>{this.props.title}</Text>
        </div>
      </aside>
    );
  }
}
