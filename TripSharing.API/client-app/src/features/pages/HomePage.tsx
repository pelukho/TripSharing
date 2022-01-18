import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Header, Tab} from "semantic-ui-react";
import useStore from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

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
        <Container style={{marginTop: '2em'}}>
            <h1>Hello from home page, here you can go to</h1>
            {userStore.isLoggedIn ? (
                <>
                    <NavLink to='/trips'>Trips Page</NavLink>
                </>
            ) : (
                <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
            )}
        </Container>
    );
})