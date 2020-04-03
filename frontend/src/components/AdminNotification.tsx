import React, { Component } from "react";
import "./AdminPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  Card,
  ICardTokens,
  ICardStyles,
  ICardSectionStyles
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
  IIconStyles
} from "office-ui-fabric-react";

export type NotificationProps = {
  title: string;
  description: string;
  notificationID: number;
  dismiss: (id: number) => void;
};

export default class AdminNotification extends Component<NotificationProps> {
  dismiss = () => {
    this.props.dismiss(this.props.notificationID);
  };
  render() {
    const cardStyles: ICardStyles = {
      root: {
        width: "100%",
        maxWidth: "100%",
        minWidth: "400px",
        minHeight: "120px",
        marginBottom: "25px"
      }
    };

    const cardTokens: ICardTokens = {};

    const titleStyles: ITextStyles = {
      root: {
        fontSize: 22,
        fontWeight: FontWeights.bold
      }
    };

    const descriptionStyles: ITextStyles = {
      root: {
        fontSize: 18,
        marginTop: 2
      }
    };

    const linkStyles: ILinkStyles = {
      root: {
        textDecoration: "underline",
        fontSize: 16,
        marginTop: 2,
        color: "#E85B6D"
      }
    };

    const cardSectionStyles: ICardSectionStyles = {
      root: {
        width: "95%",
        margin: "10px 15px"
      }
    };

    const buttonSectionStyles: ICardSectionStyles = {
      root: {
        alignSelf: "stretch",
        margin: 10
      }
    };

    const buttonProps: IIconProps = {
      iconName: "Cancel"
    };

    const buttonStyles: IIconStyles = {
      root: {
        color: "grey"
      }
    };

    return (
      <Card tokens={cardTokens} horizontal styles={cardStyles}>
        <Card.Section styles={cardSectionStyles} fill>
          <Text styles={titleStyles}>{this.props.title}</Text>
          <Text styles={descriptionStyles}>{this.props.description}</Text>
          <Link styles={linkStyles}>More details</Link>
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
