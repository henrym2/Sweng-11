import React, { Component } from "react";
import {
  Stack,
  Text,
  TextField,
  FontWeights,
  Button
} from "office-ui-fabric-react";
const boldStyle = { root: { fontWeight: FontWeights.semibold } };

type MyProps = {
  function: () => void;
};
type MyState = {};

export class VoteConfirmationView extends Component<MyProps, MyState> {
  render() {
    return (
      <div style={{position: "relative"}}>
        <h1 style={{marginTop: "50px", fontSize:"40px", fontStyle:"oblique", textAlign: "center"}}>Thank you for your vote</h1>
        <h3 style={{marginTop: "20px", textAlign: "center"}}>Our maintenance team is on the way</h3>  {/*if the user didn't choose satisfaction, show this*/}
        <h3 style={{marginTop: "10px", textAlign: "center"}}>Have a nice day</h3>{/*if the user is satisfied, show this */}
      </div>
    );
  }
}

export default VoteConfirmationView;