import React, {useEffect, useState} from "react";
import {Button, FormField, Label, Segment} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from 'uuid';
import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import DatePicker from "../../../app/common/form/DatePicker";
import {Trip, TripFormValues} from "../../../app/models/Trip";

export default observer(function TripForm() {
    
    const {tripStore} = useStore(),
        navigate = useNavigate(),
        {id} = useParams<{id: string}>(),
        [trip, setTrip] = useState<TripFormValues>(new TripFormValues());
    
    const validationSchema = Yup.object({
        date: Yup.date().required('The date is required!').nullable()
    });
    
    useEffect(() => {
        if(id) {
            tripStore.loadTrip(id).then(trip => setTrip(new TripFormValues(trip)));
        }
    }, [id, tripStore]);
    
    function handleFormSubmit(trip: TripFormValues){
        if(!trip.id) {
            let newTrip = {
                ...trip,
                id: uuid()
            };
            tripStore.createTrip(newTrip).then(() => navigate(`/trips/${newTrip.id}`));
        } else {
            tripStore.updateTrip(trip).then(() => navigate(`/trips/${trip.id}`));
        }
    }
    
    return(
        <Segment clearing>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={trip} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className={'ui form'} onSubmit={handleSubmit} autoComplete='off'>
                        <FormField>
                            <DatePicker 
                                placeholderText={'Date'}
                                name='date'
                                showTimeSelect
                                timeCaption={'Time'}
                                timeFormat={'HH:mm'}
                                dateFormat="d MMMM, yyyy HH:mm"
                            />
                            <ErrorMessage name={'date'} render={error => <Label basic color={'red'} content={error} /> }/>
                        </FormField>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' 
                        />
                        <Button as={Link} to={`/trips/${trip.id}`} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
})