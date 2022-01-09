import React from "react";
import {Form, Label} from 'semantic-ui-react'
import {useField} from "formik";
import ReactDatePicker, {ReactDatePickerProps} from "react-datepicker";

export default function DatePicker(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <ReactDatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)} 
            />
            {meta.touched && meta.error ? (
                <Label basic color={'red'}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}