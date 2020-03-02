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
  ButtonType,
  calculatePrecision
} from "office-ui-fabric-react";

type MyProps = {};
type MyState = {
  pageState: number;
  floorState: number;
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0,
    floorState:0 //when state is 0, show all the alerts
  };

  render() {
    return (
      <div className="admin-page__main">
        <div style={{marginTop: "100px", position: "relative", textAlign: "center"}}>
          <PrimaryButton onClick={()=>this.state.floorState=1} >1st floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.floorState=2} style={{marginLeft: "7%"}}>2nd floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.floorState=3} style={{marginLeft: "7%"}}>3rd floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.floorState=4} style={{marginLeft: "7%"}}>4th floor</PrimaryButton>
          <PrimaryButton onClick={()=>this.state.floorState=5} style={{marginLeft: "7%"}}>5th floor</PrimaryButton>
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
