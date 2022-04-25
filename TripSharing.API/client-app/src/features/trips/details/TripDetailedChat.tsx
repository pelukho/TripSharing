import React, {useEffect} from "react";
import {Button, Comment, Header, Loader, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import useStore from "../../../app/stores/store";
import {Link} from "react-router-dom";
import {Formik, Form, ErrorMessage, Field, FieldProps} from "formik";
import TextArea from "../../../app/common/form/TextArea";
import * as Yup from 'yup';
import {formatDistanceToNow} from "date-fns";

interface Props {
    tripId: string
}

export default observer(function TripDetailedChat({tripId}: Props) {
    const {commentStore} = useStore();

    useEffect(() => {
        if (tripId) {
            commentStore.createHubConnection(tripId);
        }

        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, tripId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
                clearing
            >
                <Header>
                    Chat about this trip
                </Header>
            </Segment>
            <Comment.Group>
                <Formik onSubmit={(values, {resetForm}) => commentStore
                    .addComment(values)
                    .then(() => resetForm())}
                        initialValues={{content: ''}}
                        validationSchema={Yup.object({
                            content: Yup.string().required()
                        })}
                >
                    {({isSubmitting, isValid, handleSubmit}) => (
                        <Form className={'ui form'}>
                            <Field name={'content'}>
                                {(props: FieldProps) => (
                                    <div style={{position: 'relative'}}>
                                        <Loader active={isSubmitting}/>
                                        <textarea
                                            placeholder="Enter your comment"
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                {commentStore.comments.map(comment => (
                    <Comment key={comment.id}>
                        <Comment.Avatar as={Link} to={`/profiles/${comment.username}`}
                                        src={comment.photo || 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'}/>
                        <Comment.Content>
                            <Comment.Author>{comment.displayName}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                            </Comment.Metadata>
                            <Comment.Text style={{whiteSpace: 'pre-wrap'}}>
                                {comment.content}
                            </Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
            </Comment.Group>
        </>
    );
})