import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Header, Tab} from "semantic-ui-react";
import useStore from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import {default as MainHeader} from "../../app/layout/Header";

export default observer(function HomePage(){
    const {userStore} = useStore();
    const panes = [
        { 
            menuItem: 'Login', 
            render: () => (
                    <>
                        <Header as='h2' textAlign={'center'}>Login</Header>
                        <LoginForm />
                    </>
            ),
        },
        { 
            menuItem: 'Register',
            render: () =>  (
                    <>
                        <Header as='h2' textAlign={'center'}>Register</Header>
                        <RegisterForm />
                    </>
            )
        }
    ]
    
    return(
        <>
            <MainHeader />
            <Container style={{paddingTop: '9em'}} className={'account-access sign-up'}>
                {userStore.isLoggedIn ? (
                    <>
                        <NavLink to='/trips'>Trips Page</NavLink>
                    </>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
                            </div>
                        </div></>
                )}
            </Container>
        </>
    );
})