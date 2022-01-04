import React from "react";
import {Header, Menu} from "semantic-ui-react";
import Calendar from "react-calendar";


export default function TripFilters() {
    return (
        <>
            <Menu vertical size={'large'} style={{width: '100%'}}>
                <Header icon={'filter'} attached color={'teal'} content={'Filter trips'} />
                <Menu.Item content={'All trips'} />
                <Menu.Item content={'I am going '} />
                <Menu.Item content={'I am hosting'} />
            </Menu>
            <Header />
            <Calendar />
        </>
    );
}