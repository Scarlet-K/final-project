import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const options = { disableDefaultUI: true, zoomControl: true };
const libraries = ['places'];
const mapStyle = {
  width: '100%',
  height: '100%',
  minHeight: '11.8rem',
  marginTop: '0.5rem',
  borderRadius: '0.2rem'
};

export default function Map(props) {

  return (
      <LoadScript
        googleMapsApiKey={mapsAPIKey}
        libraries={libraries}
        >
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={props.center}
          zoom={15}
          options={options}
        >
          <Marker
            position={props.center}
          />
        </GoogleMap>
      </LoadScript>
  );
}
