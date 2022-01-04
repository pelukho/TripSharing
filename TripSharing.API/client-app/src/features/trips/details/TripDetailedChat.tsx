import React from "react";
import {Button, Comment, Form, Header, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

export default observer(function TripDetailedChat() {
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>
                    Chat about this trip
                </Header>
            </Segment>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>
                    <Comment.Content>
                        <Comment.Author>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>1 day ago</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>
                                The hours, minutes and seconds stand as visible reminders that your
                                effort put them all there.
                            </p>
                            <p>
                                Preserve until your next run, when the watch lets you see how
                                Impermanent your efforts are.
                            </p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>
                    <Comment.Content>
                        <Comment.Author>Christian Rocha</Comment.Author>
                        <Comment.Metadata>
                            <div>2 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>I re-tweeted this.</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea/>
                    <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
                </Form>
            </Comment.Group>
        </>
    );
})