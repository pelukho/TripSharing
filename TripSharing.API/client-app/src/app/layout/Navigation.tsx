import React from "react";
import {Button, Container, Menu} from 'semantic-ui-react';

interface Props {
    openForm: (id: string) => void
}

export default function Navigation({openForm} : Props){
    return(
        <Menu inverted fixed='top'>
               <Container>
                   <Menu.Item header>
                       Logo
                   </Menu.Item>
                   <Menu.Item name="Trips"/>
                   <Menu.Item>
                       <Button positive content="Create Trip" onClick={() => openForm('1')} />
                   </Menu.Item>
               </Container>
        </Menu>
    )
}