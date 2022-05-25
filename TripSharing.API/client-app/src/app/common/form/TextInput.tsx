import React from "react";
import {Form, Label} from 'semantic-ui-react'
import {useField} from "formik";

interface Props {
    placeholder: string,
    name: string,
    label?: string,
    type?: string
}

export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <div className="form-floating">
                <label>
                    {props.label}
                </label>
                <input {...field} {...props} className={'form-control'} />
                {meta.touched && meta.error ? (
                    <Label basic color={'red'}>{meta.error}</Label>
                ) : null}
            </div>
        </Form.Field>
    );
}