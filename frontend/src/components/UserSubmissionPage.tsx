export default module.exports;

import React, { Component } from "react";
import "./UserSubmissionPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { ICardTokens } from "@uifabric/react-cards";
import mlogo from "../images/mlogo.png";
import LoginView from "./LoginView";
import VoteView from "./VoteView";
import VoteConfirmationView from "./VoteConfirmationView";

type MyProps = {};
type MyState = {
  pageState: number;
};

export class UserSubmissionPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0
  };

  CurrentView() {
    switch (this.state.pageState) {
      case 0:
        return <LoginView />;
      case 1:
        return <VoteView />;
      case 2:
        return <VoteConfirmationView />;
      default:
        return <LoginView />;
    }
  }

  render() {
    return (
      <div className="submission-page__main">
        <div
          className="submission-page__inner-box"
          style={{ boxShadow: Depths.depth8 }}
        >
          <img
            src={mlogo}
            alt="Microsoft Logo"
            className="submission-page__logo"
          />
          {this.CurrentView()}
        </div>
      </div>
    );
  }
}
