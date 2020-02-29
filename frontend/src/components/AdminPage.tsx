import React, { Component } from "react";
import "./AdminPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { ICardTokens } from "@uifabric/react-cards";
import mlogo from "../images/mlogo.png";
import thermaLogo from "../images/logo.svg";
import LoginView from "./LoginView";
import VoteView from "./VoteView";
import VoteConfirmationView from "./VoteConfirmationView";
import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  IStackTokens,
  Button,
  TextField,
  ButtonType
} from "office-ui-fabric-react";

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
        <div style={{marginTop: "100px", marginLeft: "300px"}}>
          <PrimaryButton onClick={()=>this.state.pageState=1}>1st floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.pageState=2} style={{marginLeft: "30px"}}>2nd floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.pageState=3} style={{marginLeft: "30px"}}>3rd floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.pageState=4} style={{marginLeft: "30px"}}>4th floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.pageState=5} style={{marginLeft: "30px"}}>5th floor</PrimaryButton>
        </div>
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
