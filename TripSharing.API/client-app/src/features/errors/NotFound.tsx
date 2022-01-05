import React from "react";
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name={'search'} />
                The page not found
            </Header>
            <Segment.Inline>
                <Button as={Link} to={'/trips'} primary>
                    Return to trips page
                </Button>
            </Segment.Inline>
        </Segment>
    );
}