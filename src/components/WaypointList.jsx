import React from 'react';

export default function WaypointList({ waypoints, removeWaypoint }) {
  return (
    <ul className="waypoint-list">
      {waypoints.map((place, index) => (
        <li key={index} className="waypoint-item">
          <div className="waypoint-info">
            <span className="waypoint-number">{index + 1}</span>
            <span className="waypoint-address">{place}</span>
          </div>
          <button className="btn btn-danger" onClick={() => removeWaypoint(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
