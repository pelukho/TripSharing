import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import { Trip } from "../models/Trip";
import Navigation from "./Navigation";

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  
  useEffect(() => {
    axios.get<Trip[]>('http://localhost:5001/api/Trip')
        .then(response => {
          setTrips(response.data);
        });
  }, []);
  return (
    <div className="App">
      <Navigation />
      <List>
        {trips.map(trip => (
          <List.Item key={trip.id}>
            {trip.date}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
