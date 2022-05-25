import React from "react";
import {ErrorMessage, Form, Formik} from "formik";
import TextInput from "../../app/common/form/TextInput";
import {Button, Checkbox} from "semantic-ui-react";
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
                phone: '', 
                password: '', 
                hasCar: false, 
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
                phone: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className={'ui form error user-access-form'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <TextInput placeholder={'User Name'} name={'username'} type={'text'} />
                    <TextInput placeholder={'Display Name'} name={'displayName'} type={'text'} />
                    <TextInput placeholder={'Phone'} name={'phone'} type={'tel'} />
                    <TextInput placeholder={'Email'} name={'email'} type={'email'} />
                    <TextInput placeholder={'Password'} name={'password'} type={'password'} />
                    <Checkbox toggle type={'checkbox'} name={'hasCar'} label={'Has car'} style={{
                        marginBottom: '20px',
                        color: 'grey'
                    }}/>
                    <ErrorMessage name={'error'} render={() =>
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content={'Register'} 
                        type={'submit'} 
                        fluid 
                        className={'w-100 btn btn-lg btn-primary pt-4 pb-4'}
                    />
                </Form>
            )}
        </Formik>
    );
}