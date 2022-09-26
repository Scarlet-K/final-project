import React from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import LocationInput from './location-input';

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
          <LocationInput onPlaceChange={props.onPlaceChanged} value={props.address}/>
        </Autocomplete>
      </LoadScript>
  );
}
