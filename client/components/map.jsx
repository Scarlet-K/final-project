import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const libraries = ['places'];

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const location = { lat: -25.344, lng: 131.031 };
const options = { disableDefaultUI: true, zoomControl: true };

export default function Map(props) {

  return (
    <LoadScript googleMapsApiKey={mapsAPIKey}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          minHeight: '17rem'
        }}
        center={location}
        zoom={4}
        options={options}
       />
    </LoadScript>
  );
}
