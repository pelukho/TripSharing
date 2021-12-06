import React, { useEffect, useState } from 'react';
import { Trip } from "../models/Trip";
import Navigation from "./Navigation";
import TripDashboard from "../../features/trips/dashboard/TripDashboard";
import {Container} from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import apiService from '../api/apiService';
import LoadingComponent from '../layout/LoadingComponent';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]),
      [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined),
      [editMode, setEditMode] = useState(false),
      [loading, setLoading] = useState(true),
      [submitting, setSubmitting] = useState(false);
  
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
      setSubmitting(true);
      
      if (trip.id) {
          apiService.Trips.update(trip).then(() => {
              setTrips([...trips.filter(t => t.id !== trip.id), trip]);
              setEditMode(false);
              setSubmitting(false)
              setSelectedTrip(trip);
          });
      } else {
          trip.id = uuid();
          apiService.Trips.create(trip).then(() => {
              setTrips([...trips, trip]);
              setEditMode(false);
              setSubmitting(false)
              setSelectedTrip(trip); 
          });
      }
  }
  
  function handleDeleteTrip(id: string) {
      setSubmitting(true);
      apiService.Trips.delete(id).then(() => {
          setTrips([...trips.filter(t => t.id !== id)]);
          setSubmitting(false);
      });      
  }
  
  useEffect(() => {
      apiService.Trips.list().then(response => {
          setTrips(response);
          setLoading(false);
        });
  }, []);
  
  if(loading) return <LoadingComponent content='Loading application' />
  
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
                submitting={submitting}
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
