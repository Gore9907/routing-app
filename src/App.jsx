import React, { useState } from 'react';
import AddressInput from './components/AddressInput';
import WaypointList from './components/WaypointList';
import RouteOptions from './components/RouteOptions';
import Map from './components/Map';
import StartEndInput from './components/StartEndInput';

function App() {
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [routeInfo, setRouteInfo] = useState({ duration: '', distance: '' });
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const addWaypoint = (address) => {
    setWaypoints((prev) => [...prev, address]);
  };

  const removeWaypoint = (index) => {
    setWaypoints((prev) => prev.filter((_, i) => i !== index));
  };

  const optimizeRoute = async () => {
    if (startLocation === "" || endLocation === "") return alert('Need start and end point.');
    const service = new window.google.maps.DirectionsService();
    const result = await service.route({
      origin: startLocation,//waypoints[0],
      destination: endLocation,//waypoints[waypoints.length - 1],
      waypoints: waypoints.map(loc => ({ location: loc, stopover: true })),
      //waypoints.slice(1, -1).map(loc => ({ location: loc, stopover: true })),
      optimizeWaypoints: true,
      travelMode,
    });
    setDirections(result);
    const legs = result.routes[0].legs;
    const duration = legs.reduce((sum, leg) => sum + leg.duration.value, 0);
    const distance = legs.reduce((sum, leg) => sum + leg.distance.value, 0);
    setRouteInfo({
      duration: `${Math.round(duration / 60)} mins`,
      distance: `${(distance / 1000).toFixed(1)} km`,
    });
  };

  return (
    <div className="app-container">
      <h1>Route Optimizer</h1>
      <StartEndInput
      onStartChange={(start) => setStartLocation(start)}
      onEndChange={(end) => setEndLocation(end)}
      />
      <AddressInput onPlaceSelected={addWaypoint} />
      <WaypointList waypoints={waypoints} removeWaypoint={removeWaypoint} />
      <RouteOptions
        travelMode={travelMode}
        setTravelMode={setTravelMode}
        onOptimize={optimizeRoute}
      />
      <Map directions={directions} routeInfo={routeInfo} />
    </div>
  );
}

export default App;


