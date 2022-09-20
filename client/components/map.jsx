import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

export default function Map(props) {
  const uluru = { lat: -25.344, lng: 131.031 };

  return (
    <LoadScript
      googleMapsApiKey={mapsAPIKey}
      libraries={libraries}
    >
      <GoogleMap
        onLoad={props.handleLoad}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          minHeight: '17rem'
        }}
        center={uluru}
        zoom={10}
       />
    </LoadScript>
  );
}
