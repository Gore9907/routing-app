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
      <div className="input-group">
        <label className="input-label">Start Location</label>
        <AddressInput onPlaceSelected={handleStartSelect} isStartEnd={true} />
      </div>

      <div className="input-group">
        <label className="input-label">End Location</label>
        <AddressInput onPlaceSelected={handleEndSelect} isStartEnd={true} />
      </div>
    </div>
  );
}
