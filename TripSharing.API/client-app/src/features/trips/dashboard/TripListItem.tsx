import React, {SyntheticEvent, useState} from "react";
import {Trip} from "../../../app/models/Trip";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import useStore from "../../../app/stores/store";

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
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                    </Item>
                    <Item.Content>
                        <Item.Header as={Link} to={`/trips/${trip.id}`}>{trip.id}</Item.Header>
                        <Item.Meta>{trip.date}</Item.Meta>
                        <Item.Description>
                            <div>Lorem {trip.status}</div>
                        </Item.Description>
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
        </Segment.Group>
    )
}