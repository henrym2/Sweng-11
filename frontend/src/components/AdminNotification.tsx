import React, { Component } from "react";
import "./AdminPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  Card,
  ICardTokens,
  ICardStyles,
  ICardSectionStyles,
} from "@uifabric/react-cards";
import {
  Text,
  ITextStyles,
  FontWeights,
  Link,
  ILinkStyles,
  IconButton,
  Stack,
  IIconProps,
  IIconStyles,
} from "office-ui-fabric-react";

type NotificationState = {
  showMore: boolean
}

export type NotificationProps = {
  item: any;
  title: string;
  description: string;
  notificationID: number;
  content: any[];
  type: number;
  dismiss: (id: number) => void;
};

export default class AdminNotification extends Component<NotificationProps> {

  state: NotificationState = {
    showMore: false
  }

  dismiss = () => {
    this.props.dismiss(this.props.notificationID);
  };
  showMore = () => {
    this.setState({showMore: !this.state.showMore})
  };

  renderContent = (type) => {
    const detailStyles: ITextStyles = {
      root: {
        fontSize: 16,
        marginBottom: 1,
        minHeight: "100%"
      }
    }
    let details: JSX.Element[] = []
    if (type == 0 || type == 3){
      this.props.content.forEach(c => {
        details.push(<Text styles={detailStyles}>Area {c.area} requesting a change of {c.change}&#176;C</Text>)
      })
    } else if (type == 1) {
      this.props.content.forEach(c => {
        details.push(<Text styles={detailStyles}>The sensor in area {c.area} with ID:{c.sensorID} is down.</Text>)
      })
    } else if (type == 2) {
      this.props.content.forEach(c => {
        details.push(<Text styles={detailStyles}>The temperature in area {c.area} is outside legal bounds at {c.temperature}&#176;C</Text>)
      })
    }
    return details
  }

  render() {
    const cardStyles: ICardStyles = {
      root: {
        width: "100%",
        maxWidth: "100%",
        minWidth: "400px",
        minHeight: "120px",
        marginBottom: "25px",
      },
    };

    const cardTokens: ICardTokens = {};

    const titleStyles: ITextStyles = {
      root: {
        fontSize: 22,
        fontWeight: FontWeights.bold,
      },
    };

    

    const descriptionStyles: ITextStyles = {
      root: {
        fontSize: 18,
        marginTop: 2,
      },
    };

    const linkStyles: ILinkStyles = {
      root: {
        textDecoration: "underline",
        fontSize: 16,
        marginTop: 2,
        color: "#E85B6D",
      },
    };

    const cardSectionStyles: ICardSectionStyles = {
      root: {
        width: "95%",
        margin: "10px 15px",
      },
    };

    const buttonSectionStyles: ICardSectionStyles = {
      root: {
        alignSelf: "stretch",
        margin: 10,
      },
    };

    const buttonProps: IIconProps = {
      iconName: "Cancel",
    };

    const buttonStyles: IIconStyles = {
      root: {
        color: "grey",
      },
    };

    return (
      <Card tokens={cardTokens} horizontal styles={cardStyles}>
        <Card.Section styles={cardSectionStyles} fill>
          <Text styles={titleStyles}>{this.props.title}</Text>
          {(this.props.type == 0 || this.props.type == 3) && ( 
          <Text styles={descriptionStyles}>A temperature adjustment has been requested at {(new Date(this.props.item.time)).toLocaleTimeString()}</Text>
          )
          }
          {
              this.props.type == 2 && (
            <Text styles={descriptionStyles}>Temperatures in the following areas are out of bounds</Text>
              ) 
          }
          { this.props.type == 1 && (
            <Text styles={descriptionStyles}>The following sensors are down</Text>
          )}
          <Link styles={linkStyles} onClick={this.showMore}>More details</Link>
          <Card.Section>
          {this.state.showMore && this.renderContent(this.props.type)}
          </Card.Section>
        </Card.Section>
        <Card.Section styles={buttonSectionStyles}>
          <IconButton
            iconProps={buttonProps}
            styles={buttonStyles}
            onClick={this.dismiss}
          />
        </Card.Section>
      </Card>
    );
  }
}
