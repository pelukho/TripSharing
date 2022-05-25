import React from "react";
import {ErrorMessage, Form, Formik} from "formik";
import TextInput from "../../app/common/form/TextInput";
import {Button, Label} from "semantic-ui-react";
import useStore from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

export default observer(function LoginForm() {
    const {userStore} = useStore(),
        navigate = useNavigate();
    
    return(
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore
                .login(values)
                .then(() => navigate('/trips'))
                .catch(e => setErrors({error: "Invalid email or password"}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <TextInput placeholder={'Email'} name={'email'} type={'email'} />
                    <TextInput placeholder={'Password'} name={'password'} type={'password'} />
                    <ErrorMessage name={'error'} render={() => 
                        <Label 
                            style={{marginBottom: 10}} 
                            basic 
                            color={'red'} 
                            content={errors.error} 
                        />} 
                        />
                    <Button loading={isSubmitting} positive content={'Login'} className={'pt-4 pb-4'} type={'submit'} fluid />
                </Form>
            )}
        </Formik>
    );
})