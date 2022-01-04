import React from "react";
import {Trip} from "../../../app/models/Trip";
import {observer} from "mobx-react-lite";
import {Button, Header, Image, Item, Segment} from "semantic-ui-react";

const TripImageStyle = {
    filter : 'brightness(30%)'
};

const TripTextStyle = {
    position: 'absolute',
    bottom: '5%',
    let: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    trip: Trip
}


export default observer(function TripDetailedHeader({trip} : Props) {
    return(
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0px'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' fluid style={TripImageStyle} />
                <Segment basic style={TripTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={trip.id} style={{color: 'white'}} />
                                <p>{trip.date}</p>
                                <p>Created by <strong>Stan</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join trip</Button>
                <Button>Cancel attendence</Button>
                <Button color='orange' floated='right'>
                    Edit trip
                </Button>
            </Segment>
        </Segment.Group>
    );
})