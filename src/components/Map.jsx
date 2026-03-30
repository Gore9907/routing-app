import React from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 43.65107,
  lng: -79.347015,
};

export default function Map({ directions, routeInfo }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (loadError) return <div>Map load error: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
      {routeInfo?.duration && (
        <div className="route-info-bar">
          <div className="route-stat">
            <span className="route-stat-label">Duration</span>
            <span className="route-stat-value">{routeInfo.duration}</span>
          </div>
          <div className="route-stat">
            <span className="route-stat-label">Distance</span>
            <span className="route-stat-value">{routeInfo.distance}</span>
          </div>
        </div>
      )}
    </div>
  );
}
