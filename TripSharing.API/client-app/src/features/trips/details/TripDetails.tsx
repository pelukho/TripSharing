import React, {useEffect} from "react";
import {Button, ButtonGroup, Card, Image} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

export default observer( function TripDetails(){
    const {tripStore} = useStore(),
        {loadTrip, loadingInitial, selectedTrip} = tripStore,
        {id} = useParams<{id: string}>();
    
    useEffect(() => {
        if(id) {
            loadTrip(id);
        }
    }, [id, loadTrip]);
    
    if(loadingInitial || !selectedTrip) {
        return <LoadingComponent/>;
    }
    
    return(
        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedTrip.id}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedTrip.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedTrip.status ? 'Success' : 'Not success'}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button as={Link} to={`/editTrip/${selectedTrip.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/trips'} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
});