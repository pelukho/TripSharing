import React, {Fragment} from "react";
import {Header, ItemGroup, Segment} from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import TripListItem from "./TripListItem";

export default observer(function TripList() {
    const {tripStore} = useStore(),
        {getGroupedTrips} = tripStore;
    
    return(
        <>
            {getGroupedTrips.map(([group, trips]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <ItemGroup divided>
                            {trips.map(trip => (
                                <TripListItem key={trip.id} trip={trip} />
                            ))}
                        </ItemGroup>
                    </Segment>
                </Fragment>
            ))}
        </>
    );
});