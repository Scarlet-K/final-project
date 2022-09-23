import React from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(mapsAPIKey);
Geocode.setLanguage('en');
Geocode.setLocationType('ROOFTOP');

const options = { disableDefaultUI: true, zoomControl: true };
const libraries = ['places'];
const mapStyle = {
  width: '100%',
  height: '100%',
  minHeight: '11.8rem',
  marginTop: '0.5rem',
  borderRadius: '0.2rem'
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: 33.634875, lng: -117.740481 };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    // console.log('loaded!');
    this.autocomplete = autocomplete;
    // console.log(this.autocomplete);
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      // console.log('getplace:', this.autocomplete.getPlace());
      const address = this.autocomplete.getPlace().formatted_address;
      // console.log(address);
      Geocode.fromAddress(address)
        .then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ lat, lng });
        },
        error => {
          console.error(error);
        });
    }
  }

  render() {
    // console.log(this.state);
    return (
      <LoadScript googleMapsApiKey={mapsAPIKey} libraries={libraries}>
        <Autocomplete
          onLoad={this.onLoad}
          onPlaceChanged={this.onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search Here"
            className="form-control"
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={this.state}
          zoom={14}
          options={options}
        >
          <Marker
          position={this.state}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
}
