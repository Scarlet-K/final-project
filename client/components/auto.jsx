import React from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

export default function Auto(props) {

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
            id="location"
            type="text"
            name="address"
            onChange={props.onChange}
            value={props.value}
            placeholder="Search Location"
            className="form-control"
          />
        </Autocomplete>
      </LoadScript>
  );
}
