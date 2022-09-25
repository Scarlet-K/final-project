import React from 'react';

export default function LocationInput(props) {

  return (
      <input
        required
        type="text"
        name="location"
        id="location"
        onChange={props.handleChange}
        value={props.location}
        placeholder="Search Location"
        className="form-control"
      />
  );
}
