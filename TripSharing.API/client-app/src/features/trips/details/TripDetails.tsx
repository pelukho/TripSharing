import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TripDetailedHeader from "./TripDetailedHeader";
import TripDetailedInfo from "./TripDetailedInfo";
import TripDetailedChat from "./TripDetailedChat";
import TripDetailedSidebar from "./TripDetailedSidebar";

export default observer(function TripDetails() {
    const {tripStore} = useStore(),
        {loadTrip, loadingInitial, selectedTrip} = tripStore,
        {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadTrip(id);
        }
    }, [id, loadTrip]);

    if (loadingInitial || !selectedTrip) {
        return <LoadingComponent/>;
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <TripDetailedHeader trip={selectedTrip} />
                <TripDetailedInfo trip={selectedTrip} />
                <TripDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <TripDetailedSidebar trip={selectedTrip!} />
            </Grid.Column>
        </Grid>
    );
});