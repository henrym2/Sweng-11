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
  zoneInfo: any[];
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };

  state: MyState = {
    pageState: 0,
    showZoneInfo: false,
    selectedZone: 0,
    alerts: [],
    zoneInfo: []
  };

  setIsShown = (zone, show) => {
    this.setState({ showZoneInfo: show, selectedZone: zone });
  };

  componentDidMount(): void {
    axios
      .get("https://thermapollbackend.azurewebsites.net/alerts")
      .then(res => {
        this.setState({ alerts: res.data });
        axios
        .get("https://thermapollbackend.azurewebsites.net/alerts").then(
          res => {
            let sensors = res.data;
              sensors = sensors.map(s => {
              return {...s, alerts: this.state.alerts.filter(a => {
                if(a.content.find(c => c.area == s.area)){
                  return a
                }
              })
              }
            })
            console.log(res.data);
            this.setState({zoneInfo: sensors });
          }
      )
      });
    
  }

  getZoneInfo(zone): any {
    if (this.state.zoneInfo[zone-1]) {
      console.log(this.state.zoneInfo)
      return (<div>
        <p>Temperature: {this.state.zoneInfo[zone-1].temperature}°C</p>
        <p>Active alerts: {this.state.zoneInfo[zone-1].alerts.length}</p>
      </div>
      )
    } else {
      return (<div>
        <p>No Sensor data</p>
      </div>)
    }
  }

  floorPlanScreen = () => {
    return (
      <div className="admin-page__floor-plan">
        {this.state.showZoneInfo && (
          <div className="admin-page__display-zone-info">
            <h3>Zone {this.state.selectedZone}</h3>
            {
              this.getZoneInfo(this.state.selectedZone)
            }{" "}
          </div>
        )}
        <div className="admin-page__box">
          <img src={floorPlan} />
          <div
            className="admin-page__zone1"
            onMouseEnter={() => this.setIsShown(1, true)}
            onMouseLeave={() => this.setIsShown(1, false)}
          ></div>
          <div
            className="admin-page__zone2"
            onMouseEnter={() => this.setIsShown(2, true)}
            onMouseLeave={() => this.setIsShown(2, false)}
          ></div>
          <div
            className="admin-page__zone3"
            onMouseEnter={() => this.setIsShown(3, true)}
            onMouseLeave={() => this.setIsShown(3, false)}
          ></div>
          <div
            className="admin-page__zone4"
            onMouseEnter={() => this.setIsShown(4, true)}
            onMouseLeave={() => this.setIsShown(4, false)}
          ></div>
          <div
            className="admin-page__zone5"
            onMouseEnter={() => this.setIsShown(5, true)}
            onMouseLeave={() => this.setIsShown(5, false)}
          ></div>
          <div
            className="admin-page__zone6"
            onMouseEnter={() => this.setIsShown(6, true)}
            onMouseLeave={() => this.setIsShown(6, false)}
          ></div>
          <div
            className="admin-page__zone7"
            onMouseEnter={() => this.setIsShown(7, true)}
            onMouseLeave={() => this.setIsShown(7, false)}
          ></div>
          <div
            className="admin-page__zone8"
            onMouseEnter={() => this.setIsShown(8, true)}
            onMouseLeave={() => this.setIsShown(8, false)}
          ></div>
          <div
            className="admin-page__zone9"
            onMouseEnter={() => this.setIsShown(9, true)}
            onMouseLeave={() => this.setIsShown(9, false)}
          ></div>
          <div
            className="admin-page__zone10"
            onMouseEnter={() => this.setIsShown(10, true)}
            onMouseLeave={() => this.setIsShown(10, false)}
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

  dismissNotification = (id: number) => {
    axios
      .post("https://thermapollbackend.azurewebsites.net/dismissAlert", {
        id: id
      })
      .then(res => {
        if (res.status == 200) {
          axios
            .get("https://thermapollbackend.azurewebsites.net/alerts")
            .then(res => {
              console.log(res.data);
              this.setState({ alerts: res.data });
            });
        }
      });
  };

  alertScreen = () => {
    let list = this.state.alerts;
    const listItems = list.map(item => (
      <AdminNotification
        title="Temperature Adjustment Required"
        description={`A temperature adjustment is needed in Zone ${item.content[0].area}`}
        dismiss={this.dismissNotification}
        content={item.content}
        notificationID={item._id}
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
