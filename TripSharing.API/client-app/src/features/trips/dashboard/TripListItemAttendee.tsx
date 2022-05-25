import React from 'react';
import {observer} from "mobx-react-lite";
import {Image, List} from "semantic-ui-react";
import {Profile} from "../../../app/models/Profile";
import {Link} from "react-router-dom";

interface Props {
    attendees: Profile[]
}

export default observer(function TripListItemAttendee({attendees} : Props) {
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                    <Image style={{height: '35px'}} size={'mini'} circular src={attendee.image || '/assets/images/person.png'} />
                </List.Item>
            ))}
        </List>
    );
});