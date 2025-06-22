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

  console.log("Map component loaded");
  console.log("API key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  console.log("isLoaded:", isLoaded);
  console.log("loadError:", loadError);

  if (loadError) return <div>Map load error: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="map-container">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      {routeInfo?.duration && (
        <p className="route-info">
            Time: {routeInfo.duration} | Distance: {routeInfo.distance}
        </p>
      )}
    </div>
  );
}
