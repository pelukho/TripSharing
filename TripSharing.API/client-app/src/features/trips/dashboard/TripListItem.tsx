import React, {SyntheticEvent, useState} from "react";
import {Trip} from "../../../app/models/Trip";
import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import useStore from "../../../app/stores/store";
import {format} from "date-fns";
import TripListItemAttendee from "./TripListItemAttendee";

interface Props {
    trip: Trip
}
export default function TripListItem({trip} : Props) {
    const [target, setTarget] = useState(''),
        {tripStore} = useStore();

    function handleTripDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        tripStore.deleteTrip(id);
    }
    
    return (
        <Segment.Group key={trip.id}>
            <Segment>
                {trip.isCancelled && (
                    <Label attached={'top left'} 
                           color={'red'} 
                           content={'Cancelled'} 
                           style={{textAlign: 'center'}} 
                    />
                )}
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                    </Item>
                    <Item.Content>
                        <Item.Header as={Link} to={`/trips/${trip.id}`}>{trip.id}</Item.Header>
                        <Item.Meta>{format(trip.date!, 'dd MMMM yyyy HH:mm')}</Item.Meta>
                        <Item.Description>
                            <div>Created by {trip.driver?.displayName}</div>
                        </Item.Description>
                        {trip.isDriver && (
                            <Item.Description>
                                <Label basic color={'orange'}>
                                    You are driver of this trip
                                </Label>
                            </Item.Description>
                        )}
                        {trip.isGoing && !trip.isDriver && (
                            <Item.Description>
                                <Label basic color={'green'}>
                                    You are going to this trip
                                </Label>
                            </Item.Description>
                        )}
                        <Item.Extra>
                            <Button
                                as={Link}
                                to={`/trips/${trip.id}`}
                                floated='right'
                                content='View Trip'
                                color='blue'
                            />
                            <Label basic content={trip.status ? 'Done' : 'Not done'}/>
                        </Item.Extra>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name={'clock'} /> {format(trip.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name={'marker'} /> {trip.id}
                </span>
            </Segment>
            <Segment secondary>
                <TripListItemAttendee attendees={trip.attendees!} />
            </Segment>
        </Segment.Group>
    )
}