import React from "react";
import {Form, Formik} from "formik";
import TextInput from "../../app/common/form/TextInput";
import {Button} from "semantic-ui-react";
import useStore from "../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    
    return(
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => userStore.login(values)}
        >
            {({handleSubmit, isSubmitting}) => (
                <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <TextInput placeholder={'Email'} name={'email'} type={'email'} />
                    <TextInput placeholder={'Password'} name={'password'} type={'password'} />
                    <Button loading={isSubmitting} positive content={'Login'} type={'submit'} fluid />
                </Form>
            )}
        </Formik>
    );
})