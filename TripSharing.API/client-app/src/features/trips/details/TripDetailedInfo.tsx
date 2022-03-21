import React from "react";
import {observer} from "mobx-react-lite";
import {Trip} from "../../../app/models/Trip";
import {Grid, Icon, Segment} from "semantic-ui-react";
import {format} from "date-fns";

interface Props {
    trip: Trip
}

export default observer(function TripDetailedInfo({trip} : Props) {
    return(
        <Segment.Group>
            <Segment attached="top">
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{trip.id}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='calendar' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{format(trip.date!, 'dd MMMM yyyy HH:mm')}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='marker' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{trip.id}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    );
})