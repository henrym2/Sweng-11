import React, { Component } from "react";
import "./UserSubmissionPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { ICardTokens } from "@uifabric/react-cards";
import mlogo from "../images/mlogo.png";
import thermaLogo from "../images/logo.svg";
import LoginView from "./LoginView";
import VoteView from "./VoteView";
import VoteConfirmationView from "./VoteConfirmationView";

type MyProps = {};
type MyState = {
  pageState: number;
  voterName: String;
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0,
    voterName: "Testy McTestFace"
  };

  render() {
    return (
      <div className="submission-page__main">
        <div className="submission-page__centre">
          <img
            src={thermaLogo}
            alt="ThermaPoll"
            className="submission-page__main-logo"
          />
          <div
            className="submission-page__inner-box"
            style={{ boxShadow: Depths.depth8 }}
          >
            <img
              src={mlogo}
              alt="Microsoft Logo"
              className="submission-page__logo"
            />
            ADMIN PAGE -> We'll change this full page to be similar to the
            mockups!
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
