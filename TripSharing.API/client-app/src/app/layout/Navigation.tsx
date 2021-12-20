import React from "react";
import {Button, Container, Menu} from 'semantic-ui-react';
import useStore from "../stores/store";

export default function Navigation(){
    const {tripStore} = useStore();
    
    return(
        <Menu inverted fixed='top'>
               <Container>
                   <Menu.Item header>
                       Logo
                   </Menu.Item>
                   <Menu.Item name="Trips"/>
                   <Menu.Item>
                       <Button positive content="Create Trip" onClick={() => tripStore.openForm()} />
                   </Menu.Item>
               </Container>
        </Menu>
    )
}