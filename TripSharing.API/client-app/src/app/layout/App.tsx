import React from 'react';
import Navigation from "./Navigation";
import TripDashboard from "../../features/trips/dashboard/TripDashboard";
import {Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Routes, Route, useLocation} from "react-router-dom"
import HomePage from "../../features/pages/HomePage";
import TripForm from "../../features/trips/form/TripForm";
import TripDetails from "../../features/trips/details/TripDetails";
import Layout from "..//layout/Layout";

function App() {
    const location = useLocation();
  return (
    <div className="App"> 
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route element={<Layout/>}>
                <Route path="/trips" element={<TripDashboard/>} />
                <Route path="/trips/:id" element={<TripDetails/>} />
                {/* @todo */}
                {/* Fix problem with creating new trip while editing old */}
                <Route key={location.key} path="/createTrip" element={<TripForm/>} />
                <Route key={location.key} path="/editTrip/:id" element={<TripForm/>} />
            </Route>
        </Routes>
    </div>
  );
}

export default observer(App);
