import React from "react";
import {Button, Container, Menu} from 'semantic-ui-react';
import {NavLink} from "react-router-dom";

export default function Navigation(){
    
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
               </Container>
        </Menu>
    )
}