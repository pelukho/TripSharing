import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import TripList from "./TripList";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TripFilters from "./TripFilters";


export default observer(function TripDashboard() {
    const {tripStore} = useStore(),
        {tripRepository, loadTrips} = tripStore;

    useEffect(() => {
        if(tripRepository.size <= 1) {
            loadTrips();
        }
    }, [tripRepository.size, loadTrips]);

    if(tripStore.loadingInitial) 
        return <LoadingComponent content='Loading application' />;
    
    return(
        <Grid>
            <Grid.Column width="10">
                <TripList />
            </Grid.Column>
            <Grid.Column width='6'>
                <TripFilters />
            </Grid.Column>
        </Grid>
    );
});