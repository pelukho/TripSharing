import React from "react";
import {Grid, Message} from "semantic-ui-react";
import TripList from "./TripList";
import TripDetails from "../details/TripDetails";
import TripForm from "../form/TripForm";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";


export default observer(function TripDashboard() {
    const {tripStore} = useStore(),
        {tripsByDate, selectedTrip, editMode} = tripStore;
    return(
        <Grid>
            <Grid.Column width="10">
                <TripList />
            </Grid.Column>
            <Grid.Column width='6'>
                {!tripsByDate.length &&
                <Message>
                    <Message.Header>
                        No trips yet!
                    </Message.Header>
                </Message>
                }
                
                {selectedTrip && !editMode &&
                <TripDetails /> 
                }
                
                {editMode && 
                <TripForm />
                }                
            </Grid.Column>
        </Grid>
    );
});