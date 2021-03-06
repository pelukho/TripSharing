import React from "react";
import {Container} from "semantic-ui-react";
import {Outlet} from 'react-router-dom';
import Navigation from "./Navigation";
import Header from "./Header";

export default function Layout() {
    return(
        <>
            <Navigation />
            <Container style={{marginTop: '100px'}}>
                <Outlet />
            </Container>
        </>
    )
}