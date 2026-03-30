import React from 'react';

export default function RouteOptions({ travelMode, setTravelMode, onOptimize }) {
  const modes = [
    { value: 'DRIVING', icon: '🚗', label: 'Drive' },
    { value: 'WALKING', icon: '🚶', label: 'Walk' },
    { value: 'BICYCLING', icon: '🚲', label: 'Bike' },
    { value: 'TRANSIT', icon: '🚆', label: 'Transit' },
  ];

  return (
    <div className="route-options">
      <div className="travel-mode-group">
        {modes.map((mode) => (
          <button
            key={mode.value}
            className={`travel-mode-btn${travelMode === mode.value ? ' active' : ''}`}
            onClick={() => setTravelMode(mode.value)}
            type="button"
          >
            <span className="travel-mode-icon">{mode.icon}</span>
            <span className="travel-mode-label">{mode.label}</span>
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-lg" onClick={onOptimize}>Optimize Route</button>
    </div>
  );
}
