import React from 'react';

export default function LocationInput(props) {

  return (
      <input
        required
        type="text"
        name="address"
        id="address"
        onChange={props.handleChange}
        value={props.address}
        placeholder="Search Location"
        className="form-control"
      />
  );
}
