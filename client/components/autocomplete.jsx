import React from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

export default function AutocompleteComponent(props) {

  return (
      <LoadScript
        googleMapsApiKey={mapsAPIKey}
        libraries={libraries}>
        <Autocomplete
          onLoad={props.onLoad}
          onPlaceChanged={props.onPlaceChanged}
        >
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
        </Autocomplete>
      </LoadScript>
  );
}
