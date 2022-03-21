import React from "react";
import {Trip} from "../../../app/models/Trip";
import {observer} from "mobx-react-lite";
import {Button, Header, Image, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import useStore from "../../../app/stores/store";

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
    const {tripStore: {updateAttendance, loading, cancelTripToggle}} = useStore();
    
    return(
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0px'}}>
                {trip.isCancelled && (
                    <Label style={{position: 'absolute', zIndex: 100, left: -14, top: 20}} 
                           ribbon 
                           color={'red'}
                           content={'Cancelled'}
                    />
                )}
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' fluid style={TripImageStyle} />
                <Segment basic style={TripTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={trip.id} style={{color: 'white'}} />
                                <p>{format(trip.date!, 'dd MMMM yyyy HH:mm')}</p>
                                <p>Created by <strong>{trip.driverName}</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {trip.isDriver ? (
                    <>
                        <Button color={trip.isCancelled ? 'green' : 'red'}
                                floated={'left'}
                                basic
                                content={trip.isCancelled ? 'Re-schedule trip' : 'Cancel trip'}
                                onClick={cancelTripToggle}
                                loading={loading}
                        />
                        <Button as={Link} 
                                to={`/editTrip/${trip.id}`} 
                                color='orange' 
                                floated='right'
                                disabled={trip.isCancelled}
                        >
                            Edit trip
                        </Button>
                    </>
                ) : trip.isGoing ? (
                    <Button onClick={updateAttendance} loading={loading}>Cancel attendence</Button>
                ) : (
                    <Button onClick={updateAttendance} disabled={trip.isCancelled} color='teal' loading={loading}>Join trip</Button>
                )}
            </Segment>
        </Segment.Group>
    );
})