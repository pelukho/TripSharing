import React from "react";
import {Form, Label} from 'semantic-ui-react'
import {useField} from "formik";

interface Props {
    placeholder: string,
    rows: number,
    name: string,
    label?: string
}

export default function TextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>
                {props.label}
            </label>
            <textarea {...field} {...props} className={'form-control'}/>
            {meta.touched && meta.error ? (
                <Label basic color={'red'}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}