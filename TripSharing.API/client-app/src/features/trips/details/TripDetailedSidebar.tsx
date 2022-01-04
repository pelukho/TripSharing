import React from "react";
import {Image, Item, Label, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function TripDetailedSidebar() {
    return (
        <>
            <Segment
                textAlign='center'
                style={{border: 'none'}}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                3 People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{position: 'relative'}}>
                        <Label 
                            style={{position: 'absolute'}}
                            color='orange'
                            ribbon='right'
                        >Host</Label>
                        <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                        <Item.Content verticalAlign={'middle'}>
                            <Item.Header as={'h3'}>
                                <Link to={'#'}>
                                    Rob
                                </Link>
                            </Item.Header>
                            <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item style={{position: 'relative'}}>
                        <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                        <Item.Content verticalAlign={'middle'}>
                            <Item.Header as={'h3'}>
                                <Link to={'#'}>
                                    Rob
                                </Link>
                            </Item.Header>
                            <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item style={{position: 'relative'}}>
                        <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                        <Item.Content verticalAlign={'middle'}>
                            <Item.Header as={'h3'}>
                                <Link to={'#'}>
                                    Rob
                                </Link>
                            </Item.Header>
                            <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>
    );
}