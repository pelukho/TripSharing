import React from "react";
import {ErrorMessage, Form, Formik} from "formik";
import TextInput from "../../app/common/form/TextInput";
import {Button} from "semantic-ui-react";
import useStore from "../../app/stores/store";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default function RegisterForm() {
    const {userStore} = useStore(),
        navigate = useNavigate();
    
    return(
        <Formik
            initialValues={{
                displayName: '',
                username: '',
                email: '', 
                password: '', 
                error: null
        }}
            onSubmit={(values, {setErrors}) => userStore
                .registerUser(values)
                .then(() => navigate('/trips'))
                .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className={'ui form error'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <TextInput placeholder={'User Name'} name={'username'} type={'text'} />
                    <TextInput placeholder={'Display Name'} name={'displayName'} type={'text'} />
                    <TextInput placeholder={'Email'} name={'email'} type={'email'} />
                    <TextInput placeholder={'Password'} name={'password'} type={'password'} />
                    <ErrorMessage name={'error'} render={() =>
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content={'Register'} 
                        type={'submit'} fluid 
                    />
                </Form>
            )}
        </Formik>
    );
}