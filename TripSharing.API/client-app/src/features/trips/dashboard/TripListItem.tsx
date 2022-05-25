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
                        <Item.Image size='tiny' circular src={trip.driver?.image || '/assets/images/person.png'} />
                    </Item>
                    <Item.Content>
                        <Item.Description>
                            <div>Created by <Link to={`/profiles/${trip.driver?.username}`}>{trip.driver?.displayName}</Link></div>
                        </Item.Description>
                        {trip.isDriver && (
                            <Item.Description className={'mt-2'}>
                                <Label basic color={'orange'}>
                                    You are driver of this trip
                                </Label>
                            </Item.Description>
                        )}
                        {trip.isGoing && !trip.isDriver && (
                            <Item.Description className={'mt-2'}>
                                <Label basic color={'green'}>
                                    You are going to this trip
                                </Label>
                            </Item.Description>
                        )}
                        <Item.Extra className={'mt-2'} style={{textAlign: 'right'}}>
                            <Button
                                as={Link}
                                to={`/trips/${trip.id}`}
                                content='View Trip'
                                color='blue'
                            />
                        </Item.Extra>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment>
                <p>
                    <Icon name={'clock'} /> {format(trip.date!, 'dd MMM yyyy h:mm aa')}
                </p>
                <p>
                    <Icon name={'marker'} /> {trip.from} - {trip.to}
                </p>
            </Segment>
            <Segment secondary>
                <TripListItemAttendee attendees={trip.attendees!} />
            </Segment>
        </Segment.Group>
    )
}