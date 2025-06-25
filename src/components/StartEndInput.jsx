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
      <AddressInput onPlaceSelected={handleStartSelect} isStartEnd={true} />

      <label><strong>End Location:</strong></label>
      <AddressInput onPlaceSelected={handleEndSelect} isStartEnd={true}/>
      
    </div>
  );
}
