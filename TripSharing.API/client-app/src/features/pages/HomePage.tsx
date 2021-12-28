import React from "react";
import {NavLink} from "react-router-dom";
import {Container} from "semantic-ui-react";

export default function HomePage(){
    return(
        <Container style={{marginTop: '2em'}}>
            <h1>Hello from home page, here you can go to</h1>
            <NavLink to='/trips'>Trips Page</NavLink>
        </Container>
    );
}