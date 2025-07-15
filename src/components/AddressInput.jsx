import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';

export default function AddressInput({ onPlaceSelected , isStartEnd}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteServiceRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const justSelectedRef = useRef(false);
  const inputRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (!isLoaded || !window.google) return;
    sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
  }, [isLoaded]);

  const fetchSuggestions = useRef(
    debounce((inputValue) => {
      if (!inputValue || !autocompleteServiceRef.current) return;

      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: inputValue,
          sessionToken: sessionTokenRef.current,
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || []);
          }
        }
      );
    }, 400)
  ).current;

  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    fetchSuggestions(input);
  }, [input]);

  const handleSelect = (suggestion) => {
    justSelectedRef.current = true;
    onPlaceSelected(suggestion.description);
    setInput(isStartEnd ? suggestion.description : "");
    setSuggestions([]);
    sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
    inputRef.current?.blur();
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter address"
        className="address-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => handleSelect(s)}
              className="suggestion-item"
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
