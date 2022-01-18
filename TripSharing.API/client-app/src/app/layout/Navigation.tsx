import React from "react";
import {Button, Container, Menu} from 'semantic-ui-react';
import {NavLink, useNavigate} from "react-router-dom";
import useStore from "../stores/store";

export default function Navigation(){
    const {userStore} = useStore(),
    navigator = useNavigate();
    
    let handleLogout = () => {
        userStore.logout();
        navigator('/');
    };
    return(
        <Menu inverted fixed='top'>
               <Container>
                   <Menu.Item as={NavLink} to='/' header>
                       Logo
                   </Menu.Item>
                   <Menu.Item as={NavLink} to='/trips' name="Trips"/>
                   <Menu.Item>
                       <Button positive content="Create Trip" as={NavLink} to='/createTrip' />
                   </Menu.Item>
                   {userStore.isLoggedIn && (
                       <Menu.Menu position='right'>
                           <Menu.Item
                               name='logout'
                               onClick={handleLogout}
                           />
                       </Menu.Menu>
                   )}
               </Container>
        </Menu>
    )
}