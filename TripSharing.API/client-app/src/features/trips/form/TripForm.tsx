import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from 'uuid';

export default observer(function TripForm() {
    
    const {tripStore} = useStore(),
        navigate = useNavigate(),
        {id} = useParams<{id: string}>(),
        [trip, setTrip] = useState({
             id: '',
             date: '',
             status: false,
        });
    
    useEffect(() => {
        if(id) {
            tripStore.loadTrip(id).then(trip => setTrip(trip!));
        }
    }, [id, tripStore]);
    
    function handleSubmit(){
        if(trip.id.length === 0) {
            let newTrip = {
                ...trip,
                id: uuid()
            };
            tripStore.createTrip(newTrip).then(() => navigate(`/trips/${newTrip.id}`));
        } else {
            tripStore.updateTrip(trip).then(() => navigate(`/trips/${trip.id}`));
        }
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setTrip({...trip, [name]: value});
    }
    
    function getFormatedDate(date: string) : string {
        let dateToChange = new Date(date),
            year = dateToChange.getFullYear(),
            month = (dateToChange.getMonth() + 1) < 10 ? '0' + (dateToChange.getMonth() + 1) : (dateToChange.getMonth() + 1),
            day = dateToChange.getDate() < 10 ? '0' + dateToChange.getDate() : dateToChange.getDate();
        
        return `${year}-${month}-${day}`;
    }
    
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Some text' name='date1' value={trip.date} onChange={handleInputChange} />
                <Form.Input type='date' value={getFormatedDate(trip.date)} name='date' onChange={handleInputChange} />
                <Button loading={tripStore.submitting} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={`/trips/${trip.id}`} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
})