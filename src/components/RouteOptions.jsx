import React from 'react';

export default function RouteOptions({ travelMode, setTravelMode, onOptimize }) {
  return (
    <div style={{ margin: '10px 0' }}>
      <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      <button onClick={onOptimize} style={{ marginLeft: '10px' }}>Optimize Route</button>
    </div>
  );
}