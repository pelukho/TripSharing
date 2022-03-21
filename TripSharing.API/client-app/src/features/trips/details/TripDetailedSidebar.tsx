import React from "react";
import {Image, Item, Label, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Trip} from "../../../app/models/Trip";
import {observer} from "mobx-react-lite";

interface Props {
    trip: Trip
}

export default observer(function TripDetailedSidebar({trip: {attendees, driverName}}: Props) {
    return (
        <>
            <Segment
                textAlign='center'
                style={{border: 'none'}}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees?.length} {attendees?.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees?.map(attendee => (
                        <Item key={attendee.username} style={{position: 'relative'}}>
                            {attendee.username === driverName && (
                                <Label
                                    style={{position: 'absolute'}}
                                    color='orange'
                                    ribbon='right'
                                >Host</Label>
                            )}
                            <Image size='tiny'
                                   src={attendee.image || 'https://react.semantic-ui.com/images/avatar/small/christian.jpg'}/>
                            <Item.Content verticalAlign={'middle'}>
                                <Item.Header as={'h3'}>
                                    <Link to={`/profiles/${attendee.username}`}>
                                        {attendee.displayName}
                                    </Link>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>
    );
});