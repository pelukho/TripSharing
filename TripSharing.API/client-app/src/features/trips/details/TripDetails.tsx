import React from "react";
import {Button, ButtonGroup, Card, Image} from "semantic-ui-react";
import {Trip} from "../../../app/models/Trip";

interface Props {
    trip: Trip,
    cancelSelectedTrip: () => void,
    openForm: (id: string) => void
}

export default function TripDetails({trip, cancelSelectedTrip, openForm}: Props){
    return(
        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{trip.id}</Card.Header>
                <Card.Meta>
                    <span className='date'>{trip.date}</span>
                </Card.Meta>
                <Card.Description>
                    {trip.status ? 'Success' : 'Not success'}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button basic color='blue' content='Edit' onClick={() => openForm(trip.id)}/>
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectedTrip}/>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}