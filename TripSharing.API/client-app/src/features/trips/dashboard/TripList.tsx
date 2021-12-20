import React, {SyntheticEvent, useState} from "react";
import {Button, Item, ItemGroup, Label, Segment} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function TripList() {
    const [target, setTarget] = useState(''),
        {tripStore} = useStore();
    
    function handleTripDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        tripStore.deleteTrip(id);
    }
    return(
        <Segment>
            <ItemGroup divided>
                {tripStore.tripsByDate?.map(trip => (
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
                                    loading={tripStore.submitting && target === trip.id}
                                />
                                <Button 
                                    floated='right' 
                                    content='View Trip' 
                                    color='blue'
                                    onClick={() => tripStore.setSelectedTrip(trip)}
                                />
                                <Label basic content={trip.status ? 'Done' : 'Not done'}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    );
});