import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const location = { lat: -25.344, lng: 131.031 };
const options = { disableDefaultUI: true, zoomControl: true };
const places = ['places'];
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
    this.state = {};
    this.searchBox = null;
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onPlacesChanged(searchBox) {
    // console.log('Heh');
    this.searchBox.getPlace();
  }

  onLoad(searchBox) {
    // console.log(searchBox);
    this.searchBox = searchBox;
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={mapsAPIKey} libraries={places}>
        <StandaloneSearchBox
          onPlacesChanged={this.onPlacesChanged} onLoad={this.onLoad}>
          <input
            type="text"
            placeholder="Search Here"
            className='form-control'
            ref={this.ref}
          />
        </StandaloneSearchBox>
        <GoogleMap
          onLoad={this.onLoad}
          mapContainerStyle={mapStyle}
          center={location}
          zoom={3}
          options={options}
        >
          {/* <StandaloneSearchBox
          onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Search Here"
            style={inputStyle}
          />
        </StandaloneSearchBox> */}
        </GoogleMap>
      </LoadScript>
    );
  }
}
