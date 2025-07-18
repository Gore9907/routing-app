import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import HistoryPage from './HistoryPage';
import AddressInput from './AddressInput';
import WaypointList from './WaypointList';
import RouteOptions from './RouteOptions';
import Map from './Map';
import StartEndInput from './StartEndInput';
import NavigationButton from './NavigationButton';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginPage from './LoginPage';


function OptimizerPage() {
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [routeInfo, setRouteInfo] = useState({ duration: '', distance: '' });
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [optimisedWaypoints, setOptimisedWaypoints] = useState([]);
  const { user , logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const to_history = () =>{
    navigate("/history")
  }

  const addWaypoint = (address) => {
    setWaypoints((prev) => [...prev, address]);
  };

  const removeWaypoint = (index) => {
    setWaypoints((prev) => prev.filter((_, i) => i !== index));
  };

  const toMaps = () => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const origin = `&origin=${encodeURIComponent(startLocation)}`;
    const destination = `&destination=${encodeURIComponent(endLocation)}`;
    const wp = optimisedWaypoints.length
      ? `&waypoints=${optimisedWaypoints.map(encodeURIComponent).join('|')}`
      : "";

    const link = `${base}${origin}${destination}${wp}`;
    window.open(link, '_blank');
  }

  const optimizeRoute = async () => {
    if (startLocation === "" || endLocation === "") return alert('Need start and end point.');
    const service = new window.google.maps.DirectionsService();
    const result = await service.route({
      origin: startLocation,
      destination: endLocation,
      waypoints: waypoints.map(loc => ({ location: loc, stopover: true })),
      optimizeWaypoints: true,
      travelMode,
    });
    setDirections(result);
    const route = result.routes[0];
    const optimizedWaypointOrder = route.waypoint_order;
    const orderedWaypoints = optimizedWaypointOrder.map(index => waypoints[index]);
    setOptimisedWaypoints(orderedWaypoints);
    const legs = result.routes[0].legs;
    const durationSec = legs.reduce((sum, leg) => sum + leg.duration.value, 0);
    const distanceMeters = legs.reduce((sum, leg) => sum + leg.distance.value, 0);
    const durationText = `${Math.round(durationSec / 60)} mins`;
    const distanceText = `${(distanceMeters / 1000).toFixed(1)} km`;
    setRouteInfo({
      duration: durationText,
      distance: distanceText,
    });
    if (user && !user.isAnonymous) {
    const ref = collection(db, 'users', user.uid, 'history');
    await addDoc(ref, {
      start: startLocation,
      end: endLocation,
      waypoints,
      optimisedWaypoints:orderedWaypoints,
      travelMode,
      duration: durationText,
      distance: distanceText,
      createdAt: serverTimestamp()
    });
    };
  }
  return (
    <div className="app-container">
      <h1>Route Optimizer</h1>
      <nav className='nav-bar'>
        {user && !user.isAnonymous ?<><button className = 'nav-button'onClick={to_history}>History</button>
        <button className = 'nav-button' onClick={async() =>{logout()}}>Logout</button></>: <></>}
        {user && user.isAnonymous && <button className='nav-button' onClick={async() =>{logout()}}>Signup or Login</button>}
      </nav>
      <StartEndInput
      onStartChange={(start) => setStartLocation(start)}
      onEndChange={(end) => setEndLocation(end)}
      />
      <label className='way-point-label'><strong>Add Waypoints:</strong></label>
      <AddressInput onPlaceSelected={addWaypoint} isStartEnd={false}/>
      <WaypointList waypoints={waypoints} removeWaypoint={removeWaypoint} />
      <RouteOptions
        travelMode={travelMode}
        setTravelMode={setTravelMode}
        onOptimize={optimizeRoute}
      />
      <Map directions={directions} routeInfo={routeInfo} />
      {directions && <NavigationButton onNavigate={toMaps} />}
    </div>
  );
}

export default OptimizerPage;


