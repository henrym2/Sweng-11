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

  login() {
    this.setState({ pageState: 1 }); //Log in -> change page state to 1
  }

  vote() {
    //Axios code will go here
    this.setState({ pageState: 2 }); //Display thank you message - change page state to 2
  }

  home() {
    this.setState({ pageState: 0 }); //Return to the login page
  }

  CurrentView() {
    switch (this.state.pageState) {
      case 0:
        return (
          <>
            <LoginView function={() => this.login()} />
          </>
        );
      case 1:
        return <VoteView function={() => this.vote()} />;
      case 2:
        return <VoteConfirmationView function={() => this.home()} />;
      default:
        return <LoginView function={() => this.login()} />;
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
          <div className="submission-page__view">{this.CurrentView()}</div>
        </div>
      </div>
    );
  }
}

export default UserSubmissionPage;
