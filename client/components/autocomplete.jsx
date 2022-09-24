import React from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

export default class AutocompleteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
    // console.log(this.autocomplete);
  }

  onPlaceChanged() {
    const lat = this.autocomplete.getPlace().geometry.location.lat();
    const lng = this.autocomplete.getPlace().geometry.location.lng();
    // const placeName = this.autocomplete.getPlace().name;
    const address = this.autocomplete.getPlace().formatted_address;
    // console.log(lat, lng);
    // console.log(placeName);
    // console.log(address);
    this.setState({
      latlng: `${lat}, ${lng}`,
      location: address
    });
    // console.log(this.state);
  }

  // onLoad(autocomplete) {
  //   this.autocomplete = autocomplete;
  //   // console.log(this.autocomplete);
  // }

  // onPlaceChanged() {
  //   const lat = this.autocomplete.getPlace().geometry.location.lat();
  //   const lng = this.autocomplete.getPlace().geometry.location.lng();
  //   const placeName = this.autocomplete.getPlace().name;
  //   const address = this.autocomplete.getPlace().formatted_address;
  //   console.log(lat, lng);
  //   console.log(placeName);
  //   console.log(address);
  //   this.setState({ lat, lng });
  // }

  render() {
    return (
      <LoadScript
        googleMapsApiKey={mapsAPIKey}
        libraries={libraries}>
        <Autocomplete
          onLoad={this.onLoad}
          onPlaceChanged={this.onPlaceChanged}
        >
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Search Here"
            className="form-control"
          />
        </Autocomplete>
      </LoadScript>
    );
  }
}
