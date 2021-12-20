import React, { useEffect } from 'react';
import Navigation from "./Navigation";
import TripDashboard from "../../features/trips/dashboard/TripDashboard";
import {Container} from "semantic-ui-react";
import LoadingComponent from '../layout/LoadingComponent';
import {observer} from "mobx-react-lite";
import useStore from "../stores/store";

function App() {
  const {tripStore} = useStore();
  
  useEffect(() => {
      tripStore.loadTrips();
  }, [tripStore]);
  
  if(tripStore.loadingInitial) return <LoadingComponent content='Loading application' />
  
  return (
    <div className="App">
      <Navigation />
        <Container style={{marginTop: '100px'}}>
            <TripDashboard />
        </Container>
    </div>
  );
}

export default observer(App);
