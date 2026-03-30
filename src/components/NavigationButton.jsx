import React from "react";

export default function NavigationButton({ onNavigate }) {
  return (
    <button className="btn btn-success btn-navigate" onClick={onNavigate}>
      Open in Google Maps →
    </button>
  );
}
