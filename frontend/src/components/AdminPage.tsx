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
import closeBtn from "../images/close.svg";
import axios from "axios";
import { ITextStyles, FontWeights } from "office-ui-fabric-react";

import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  IStackTokens,
  Button,
  TextField,
  ButtonType,
  calculatePrecision,
} from "office-ui-fabric-react";
import { Redirect } from "react-router";

type MyProps = {};
type MyState = {
  pageState: number;

  showZoneInfo: boolean;
  selectedZone: number;
  alerts: any;
  zoneInfo: any;
  redirect: boolean;
};

export class AdminPage extends Component<MyProps, MyState> {
  cardTokens: ICardTokens = { childrenMargin: 12 };
  titleStyles: ITextStyles = {
    root: {
      fontSize: 22,
      fontWeight: FontWeights.bold,
      marginLeft: "10%",
      marginTop: "20px",
      marginBottom: "5px",
      color: "#E85B6D",
    },
  };
  state: MyState = {
    pageState: 0,
    showZoneInfo: false,
    selectedZone: 0,
    alerts: [],
    zoneInfo: [
      { name: "Zone 1", temperature: 0, alerts: [], active: true },
      { name: "Zone 2", temperature: 0, alerts: [], active: false },
      { name: "Zone 3", temperature: 0, alerts: [], active: false },
      { name: "Zone 4", temperature: 0, alerts: [], active: false },
      { name: "Zone 5", temperature: 0, alerts: [], active: false },
      { name: "Zone 6", temperature: 0, alerts: [], active: false },
      { name: "Zone 7", temperature: 0, alerts: [], active: false },
      { name: "Zone 8", temperature: 0, alerts: [], active: false },
      { name: "Zone 9", temperature: 0, alerts: [], active: false },
      { name: "Zone 10", temperature: 0,alerts: [], active: false },
    ],
    redirect: false,
  };

  setIsShown = (zone, show) => {
    this.setState({ showZoneInfo: show, selectedZone: zone });
  };

  componentDidMount(): void {
    axios
      .get("https://thermapollbackend.azurewebsites.net/alerts")
      .then((res) => {
        this.setState({ alerts: res.data });
        axios.get("https://thermapollbackend.azurewebsites.net/sensorData").then(sensorRes => {
          let sensors = sensorRes.data;
              sensors = sensors.map(s => {
              return {...s, alerts: this.state.alerts.filter(a => {
                if(a.content.find(c => c.area == s.area)){
                  return a
                }
              })
            }
          })
          this.setState({
            zoneInfo: this.state.zoneInfo.map((z, index) => {
              if(sensors[index] != undefined){
                return {...z, temperature: sensors[index].temperature, alerts: sensors[index].alerts, active: true}
              } else {
                return z
              }
            } )
          })
        })
        console.log(res.data);
        

        // let data = res.data;
        // data.forEach((element) => {
        //   let area = element.content[0].area;

        //   let zoneNumber = 0;
        //   for (let i = 1; i <= 10; i++) {
        //     if (area.includes(i)) {
        //       zoneNumber = i;
        //     }
        //   }
        //   console.log(zoneNumber);

        //   let temperatureValue = element.content[0].temperature;
        //   //Get the current data for the zones
        //   let ziArr = this.state.zoneInfo;
        //   //Get the zone associated with this reading
        //   //Activate it for showing UI
        //   ziArr[zoneNumber - 1].active = true;
        //   //Add the current temperature as a value
        //   ziArr[zoneNumber - 1].temp.push({ val: temperatureValue });
        //   this.setState({ zoneInfo: ziArr });
        // });
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
        id: id,
      })
      .then((res) => {
        if (res.status == 200) {
          axios
            .get("https://thermapollbackend.azurewebsites.net/alerts")
            .then((res) => {
              console.log(res.data);
              this.setState({ alerts: res.data });
            });
        }
      });
  };

  alertScreen = () => {
    let list = this.state.alerts;
    const listItems = list.map((item) => (
      <AdminNotification
        title="Temperature Adjustment Required"
        description={`A temperature adjustment has been requested at ${(new Date(item.time)).toLocaleTimeString()}`}
        dismiss={this.dismissNotification}
        content={item.content}
        notificationID={item._id}
      />
    ));
    return <div className="admin-page__notifications">{listItems}</div>;
  };

  closePage = () => {
    this.setState({ redirect: true });
  };

  render() {
    let selectedZone = this.state.zoneInfo[this.state.selectedZone - 1];
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="admin-page__main">
        <div className="admin-page__top-bar">
          <img
            src={thermaLogo}
            alt="therma logo"
            className="admin-page__logo "
          />
          <img
            src={closeBtn}
            style={{ cursor: "grab", marginRight: "20px" }}
            onClick={() => this.closePage()}
          />
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
            {this.state.pageState == 1 && (
              <Text styles={this.titleStyles}>
                Zone Selected:{" "}
                <b style={{ fontWeight: "normal" }}>
                  {this.state.showZoneInfo
                    ? `${selectedZone.name}`
                    : "None Selected"}
                </b>
              </Text>
            )}
            {this.state.showZoneInfo && (
              <div className="admin-page__display-zone-info">
                {selectedZone.active && (
                  <div>
                    <p>Temperature reading: {selectedZone.temperature}&#176;C</p>
                    <p>Active Alerts: {selectedZone.alerts.length}</p>
                  </div>
                )}
                {!selectedZone.active && (
                  <div>No information available for this zone!</div>
                )}
              </div>
            )}
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
