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

type MyProps = {};
type MyState = {
  pageState: number;
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0
  };

  viewAlerts = () => {
    this.setState({ pageState: 0 });
  };

  viewFloorplan = () => {
    this.setState({ pageState: 1 });
  };

  alertScreen = () => {
    return (
      <div className="admin-page__notifications">
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 4."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
        <AdminNotification
          title="Please Adjust Temperature"
          desctription="A temperature adjustment is needed on floor 2."
        />
      </div>
    );
  };

  floorPlanScreen = () => {
    return (
      <div className="admin-page__floor-plan">
        <img src={floorPlan} />
      </div>
    );
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
