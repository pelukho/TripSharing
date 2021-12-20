import React, {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function TripForm() {
    
    const {tripStore} = useStore(),
        initialState = tripStore.selectedTrip ?? {
        id: '',
        date: '',
        status: false,
    };
    
    const [trip, setTrip] = useState(initialState);
    
    function handleSubmit(){
        trip.id ? tripStore.updateTrip(trip) : tripStore.createTrip(trip);
        console.log(trip);
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
                <Button floated='right' type='button' content='Cancel' onClick={tripStore.closeForm}/>
            </Form>
        </Segment>
    );
})