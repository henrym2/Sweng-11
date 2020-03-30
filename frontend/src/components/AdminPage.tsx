import React, { Component } from "react";
import "./AdminPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { ICardTokens } from "@uifabric/react-cards";
import mlogo from "../images/mlogo.png";
import thermaLogo from "../images/logo-white.svg";
import AdminNotification from "./AdminNotification";
import SideBarButton from "./SideBarButton";
import alertIcon from "../images/alert-icon.svg";
import mapIcon from "../images/map-icon.svg";
import floorPlan from "../images/floor-plan.svg";
import axios from "axios";

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

  showZoneInfo: boolean;
  selectedZone: number;
  alerts: any;
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0,
    showZoneInfo: false,
    selectedZone: 0,
    alerts: []
  };

  setIsShown = (zone, show) => {
    this.setState({ showZoneInfo: show, selectedZone: zone });
  };

  componentDidMount(): void {
    axios.get("http://localhost:8080/alerts").then(res => {
      console.log(res.data);
      this.setState({ alerts: res.data });
    });
  }

  floorPlanScreen = () => {
    return (
      <div className="admin-page__floor-plan">
        {this.state.showZoneInfo && (
          <div className="admin-page__display-zone-info">
            Display info about zone {this.state.selectedZone} here
          </div>
        )}
        <div className="admin-page__box">
          <img src={floorPlan} />
          <div
            className="admin-page__zone1"
            onMouseEnter={() => this.setIsShown(1, true)}
            onMouseLeave={() => this.setIsShown(1, false)}
          ></div>
        </div>
      </div>
    );
  };

  viewAlerts = () => {
    this.setState({ pageState: 0 });
  };

  viewFloorplan = () => {
    this.setState({ pageState: 1 });
  };

  alertScreen = () => {
    let list = this.state.alerts;
    const listItems = list.map(item => (
      <AdminNotification
        title="Temperature Adjustment Required"
        desctription={`A temperature adjustment is needed in ${item.content[0].area}`}
      />
    ));
    return <div className="admin-page__notifications">{listItems}</div>;
  };

  render() {
    return (
      <div className="admin-page__main">
        <div className="admin-page__top-bar">
          <img
            src={thermaLogo}
            alt="therma logo"
            className="admin-page__logo "
          />
          Top Bar (Milu)
        </div>
        <div className="admin-page__bottom">
          <div className="admin-page__side-bar">
            <SideBarButton
              title="Alerts &amp; Notifications"
              icon={alertIcon}
              color={this.state.pageState == 0 ? "#F8F8FF" : "white"}
              switchDisplay={() => this.viewAlerts()}
            />
            <SideBarButton
              title="Floorplan &amp; Heatmap"
              icon={mapIcon}
              color={this.state.pageState == 1 ? "#F8F8FF" : "white"}
              switchDisplay={() => this.viewFloorplan()}
            />
          </div>
          {this.state.pageState == 0
            ? this.alertScreen()
            : this.floorPlanScreen()}
        </div>
      </div>
    );
  }
}

export default AdminPage;
