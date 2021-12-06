import React, {SyntheticEvent, useState} from "react";
import {Trip} from "../../../app/models/Trip";
import {Button, Item, ItemGroup, Label, Segment} from "semantic-ui-react";

interface Props {
    trips: Trip[],
    selectTrip: (id: string) => void,
    deleteTrip: (id: string) => void,
    submitting: boolean
}
export default function TripList({trips, selectTrip, deleteTrip, submitting} : Props) {
    const [target, setTarget] = useState('');
    
    function handleTripDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTrip(id);
    }
    return(
        <Segment>
            <ItemGroup divided>
                {trips?.map(trip => (
                    <Item key={trip.id}>
                        <Item.Content>
                            <Item.Header as='a'>{trip.id}</Item.Header>
                            <Item.Meta>{trip.date}</Item.Meta>
                            <Item.Description>
                                <div>Lorem {trip.status}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    name={trip.id}
                                    floated='right'
                                    content='Delete Trip'
                                    color='red'
                                    onClick={e => handleTripDelete(e, trip.id)}
                                    loading={submitting && target === trip.id}
                                />
                                <Button 
                                    floated='right' 
                                    content='View Trip' 
                                    color='blue'
                                    onClick={() => selectTrip(trip.id)}
                                />
                                <Label basic content={trip.status ? 'Done' : 'Not done'}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    );
}