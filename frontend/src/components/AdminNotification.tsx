import React, { Component } from "react";
import "./AdminPage.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { Card, ICardTokens, ICardStyles, ICardSectionStyles } from "@uifabric/react-cards";
import {Text, ITextStyles, FontWeights, Link, ILinkStyles, IconButton, Stack, IIconProps, IIconStyles} from "office-ui-fabric-react";

export type NotificationProps = {
    title : string;
    desctription : string;
};

export class AdminNotification extends Component<NotificationProps>{

    render(){

        const cardStyles : ICardStyles = {
            root:{
                width:'100%',
                maxWidth: '1000px',
                minWidth: '400px',
                minHeight:'120px',
                margin:'10px 10px'
            }
        }
        
        const cardTokens : ICardTokens = {
        }

        const titleStyles : ITextStyles = {
            root:{
                fontSize:20,
                fontWeight:FontWeights.bold,
            }
        }

        const descriptionStyles : ITextStyles = {
            root : {
                fontSize: 15,
                marginTop:2
            }
        }

        const linkStyles : ILinkStyles = {
            root : {
                textDecoration:'underline',
                fontSize: 15,
                marginTop:2
            }
        }
        
        const cardSectionStyles : ICardSectionStyles = {
            root : {
                width : '95%',
                margin : '10px 15px'
            }
        }

        const buttonSectionStyles : ICardSectionStyles = {
            root : {
                alignSelf: 'stretch',
                margin : 10,
            }
        }

        const buttonProps : IIconProps = {
            iconName : 'Cancel',
        }

        const buttonStyles : IIconStyles = {
            root : {
                color : 'grey'
            }
        }

        return (
        <Card tokens={cardTokens} horizontal styles={cardStyles}>
            <Card.Section styles={cardSectionStyles} fill>
                <Text styles={titleStyles}>{this.props.title}</Text>
                <Text styles={descriptionStyles}>{this.props.desctription}</Text>
                <Link styles={linkStyles}>More details</Link>
            </Card.Section>
            <Card.Section styles={buttonSectionStyles}>
                <IconButton iconProps={buttonProps} styles={buttonStyles}/>
            </Card.Section>
        </Card>
        );
    }

}