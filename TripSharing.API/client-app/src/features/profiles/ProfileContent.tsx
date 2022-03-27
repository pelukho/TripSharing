import React from "react";
import {Tab} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import {Profile} from "../../app/models/Profile";
import {observer} from "mobx-react-lite";

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({profile} : Props){
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Trips', render: () => <Tab.Pane>Trips Content</Tab.Pane>},
    ];
    
    return(
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition={'right'}
            panes={panes}
        />
    );
});