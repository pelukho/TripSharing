import React from "react";
import {Button, ButtonGroup, Card, Image} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function TripDetails(){
    const {tripStore} = useStore();
    
    if(!tripStore.selectedTrip) {
        return <LoadingComponent/>;
    }
    
    return(
        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{tripStore.selectedTrip.id}</Card.Header>
                <Card.Meta>
                    <span className='date'>{tripStore.selectedTrip.date}</span>
                </Card.Meta>
                <Card.Description>
                    {tripStore.selectedTrip.status ? 'Success' : 'Not success'}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button basic color='blue' content='Edit' onClick={() => tripStore.openForm(tripStore.selectedTrip?.id)}/>
                    <Button basic color='grey' content='Cancel' onClick={tripStore.cancelSelectedTrip}/>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}