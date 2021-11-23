import React from "react";
import {Button, Container, Menu} from 'semantic-ui-react';

export default function Navigation(){
    return(
        <Menu inverted fixed='top'>
               <Container>
                   <Menu.Item header>
                       Logo
                   </Menu.Item>
                   <Menu.Item name="Trips"/>
                   <Menu.Item>
                       <Button positive content="Create Trip"/>
                   </Menu.Item>
               </Container>
        </Menu>
    )
}