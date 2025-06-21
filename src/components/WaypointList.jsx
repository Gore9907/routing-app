import React from 'react';

export default function WaypointList({ waypoints, removeWaypoint }) {
  return (
    <ul className="waypoint-list">
      {waypoints.map((place, index) => (
        <li key={index} className="waypoint-item">
          <span>{place}</span>
          <button onClick={() => removeWaypoint(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
