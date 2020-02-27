import React, { Component } from "react";
import "./AdminPage.css";
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
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0
  };

  render() {
    return (
      <div className="admin-page__main">
        <div>Top Bar (Milu)</div>
        <div>
          Bottom part
          <div>Side Bar</div>
          <div>
            Page Content (Matthew - put notification/alert card in here for now)
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
