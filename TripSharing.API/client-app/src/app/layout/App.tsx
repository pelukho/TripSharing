import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trip } from "../models/Trip";
import Navigation from "./Navigation";
import TripDashboard from "../../features/trips/dashboard/TripDashboard";
import {Container} from "semantic-ui-react";
import {v4 as uuid} from 'uuid';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  function handleSelectedTrip(id: string) {
      setSelectedTrip(trips.find(x => x.id === id));
  }
  
  function handleCancelSelectedTrip() {
      setSelectedTrip(undefined);
  }
  
  function handleFormOpen(id: string) {
      id ? handleSelectedTrip(id) : handleCancelSelectedTrip();
      setEditMode(true);
  }
  
  function handleFormClose(){
      setEditMode(false);
  }
  
  function handleCreateOrUpdateTrip(trip: Trip) {
      trip.id 
          ? setTrips([...trips.filter(t => t.id !== trip.id), trip]) 
          : setTrips([...trips, {...trip, id: uuid()}]);
      setEditMode(false);
      setSelectedTrip(trip);
  }
  
  function handleDeleteTrip(id: string) {
      setTrips([...trips.filter(t => t.id !== id)]);
  }
  
  useEffect(() => {
    axios.get<Trip[]>('http://localhost:5001/api/Trip')
        .then(response => {
          setTrips(response.data);
        });
  }, []);
  return (
    <div className="App">
      <Navigation openForm={handleFormOpen} />
        <Container style={{marginTop: '100px'}}>
            <TripDashboard 
                trips={trips}
                trip={selectedTrip}
                selectTrip={handleSelectedTrip}
                cancelSelectedTrip={handleCancelSelectedTrip}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrUpdate={handleCreateOrUpdateTrip}
                deleteTrip={handleDeleteTrip}
            />
        </Container>
    </div>
  );
}

export default App;
