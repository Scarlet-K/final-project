import React from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const location = { lat: -25.344, lng: 131.031 };
const options = { disableDefaultUI: true, zoomControl: true, fields: ['formatted_address', 'geometry', 'name'] };
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
    this.state = {};
    this.auto = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(auto) {
    // console.log(this.auto);
    // this.searchBox = searchBox;
    this.auto = auto;
  }

  onPlaceChanged() {
    if (this.auto !== null) {
      // console.log(this.auto);
    } else {
      // console.log('Autocomplete is not loaded yet!');
    }

  }

  render() {
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
        {/* <StandaloneSearchBox
          onPlacesChanged={this.onPlacesChanged} ref={this.searchBox}>
          <input
            type="text"
            placeholder="Search Here"
            className='form-control'
            ref={this.ref}
          />
        </StandaloneSearchBox> */}
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
