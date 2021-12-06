import React from "react";
import {Grid, Message} from "semantic-ui-react";
import { Trip } from "../../../app/models/Trip";
import TripList from "./TripList";
import TripDetails from "../details/TripDetails";
import TripForm from "../form/TripForm";

interface Props {
    trips: Trip[],
    trip: Trip | undefined,
    selectTrip: (id: string) => void,
    cancelSelectedTrip: () => void,
    editMode: boolean,
    openForm: (id: string) => void,
    closeForm: () => void,
    createOrUpdate: (trip: Trip) => void,
    deleteTrip: (id: string) => void,
    submitting: boolean
}
export default function TripDashboard({trips, trip, 
    selectTrip, cancelSelectedTrip, editMode, openForm, closeForm, createOrUpdate, deleteTrip, submitting} : Props) {
    return(
        <Grid>
            <Grid.Column width="10">
                <TripList 
                    trips={trips} 
                    selectTrip={selectTrip} 
                    deleteTrip={deleteTrip} 
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {!trips.length &&
                <Message>
                    <Message.Header>
                        No trips yet!
                    </Message.Header>
                </Message>
                }
                
                {trip && !editMode &&
                <TripDetails 
                    trip={trip} 
                    cancelSelectedTrip={cancelSelectedTrip}
                    openForm={openForm}
                /> 
                }
                
                {editMode && 
                <TripForm 
                    closeForm={closeForm} 
                    selectedTrip={trip}
                    createOrUpdate={createOrUpdate}
                    submitting={submitting}
                />
                }                
            </Grid.Column>
        </Grid>
    );
}