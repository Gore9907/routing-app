import React, { useState } from 'react';
import AddressInput from './AddressInput';

export default function StartEndInput({ onStartChange, onEndChange }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleStartSelect = (address) => {
    setStart(address);
    if (onStartChange) onStartChange(address);
  };

  const handleEndSelect = (address) => {
    setEnd(address);
    if (onEndChange) onEndChange(address);
  };

  return (
    <div className="start-end-container">
      <label><strong>Start Location:</strong></label>
      <AddressInput onPlaceSelected={handleStartSelect} />

      <label><strong>End Location:</strong></label>
      <AddressInput onPlaceSelected={handleEndSelect} />

      <div className="selected-values">
        <p><strong>Start:</strong> {start}</p>
        <p><strong>End:</strong> {end}</p>
      </div>
    </div>
  );
}
