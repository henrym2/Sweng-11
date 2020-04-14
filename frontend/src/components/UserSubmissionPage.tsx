import React, { Component } from "react";
import "./UserSubmissionPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { ICardTokens } from "@uifabric/react-cards";
import mlogo from "../images/mlogo.png";
import thermaLogo from "../images/logo.svg";
import LoginView from "./LoginView";
import VoteView from "./VoteView";
import VoteConfirmationView from "./VoteConfirmationView";
import { Redirect } from "react-router-dom";
import { AxiosResponse } from "axios";

type MyProps = {};
type MyState = {
  pageState: number;
  voterName: String;
  employeeNumber: String;
  showAdmin: boolean;
};

export class UserSubmissionPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0,
    voterName: "Testy McTestFace",
    employeeNumber: "",
    showAdmin: false
  };

  login = (name: String, employeeNumber: String) => {
    this.setState({
      pageState: 1,
      voterName: name,
      employeeNumber: employeeNumber
    }); //Log in -> change page state to 1
    console.log("Thanks " + name);
  };

  vote = (opinion: number) => {
    //Make post request to server (on localhost for now)
    const axios = require("axios");
    axios
      .post("http://localhost:8080/vote", {
        submitter: this.state.voterName,
        opinion: opinion
      },
      {headers: { "Content-Type": "application/json",
      Accept: "application/json"}} )
      .then(function(response: AxiosResponse) {
        console.log(response);
        console.log("User has voted: " + opinion);
      })
      .catch(function(error: String) {
        console.log(error);
      });

    this.setState({ pageState: 2 }); //Display thank you message - change page state to 2
  };

  home = () => {
    this.setState({ pageState: 0 }); //Return to the login page
  };
  showAdminPage = () => {
    this.setState({ showAdmin: true });
  };

  CurrentView() {
    switch (this.state.pageState) {
      case 0:
        return (
          <>
            <LoginView function={this.login} />
          </>
        );
      case 1:
        return <VoteView function={this.vote} />;
      case 2:
        return (
          <VoteConfirmationView
            function={this.home}
            name={this.state.voterName}
          />
        );
      default:
        return <LoginView function={this.login} />;
    }
  }

  render() {
    return (
      <div className="submission-page__main">
        {this.state.showAdmin && <Redirect from="/" to="/admin" />}

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

            <div className="submission-page__view">{this.CurrentView()}</div>
          </div>
          <div
            style={{
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "20px",
              cursor: "grab",
              color: "lightgrey"
            }}
            onClick={this.showAdminPage}
          >
            Admin Page
          </div>
        </div>
      </div>
    );
  }
}

export default UserSubmissionPage;
