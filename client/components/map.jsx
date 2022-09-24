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

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: 33.634875, lng: -117.740481 };
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey={mapsAPIKey}
        libraries={libraries}
        >
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={this.state}
          zoom={15}
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

// export default class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lat: 33.634875,
//       lng: -117.740481,
//       location: ''
//     };
//     this.onLoad = this.onLoad.bind(this);
//     this.onPlaceChanged = this.onPlaceChanged.bind(this);
//   }

//   onLoad(autocomplete) {
//     this.autocomplete = autocomplete;
//     // console.log(this.autocomplete);
//   }

//   onPlaceChanged() {
//     const lat = this.autocomplete.getPlace().geometry.location.lat();
//     const lng = this.autocomplete.getPlace().geometry.location.lng();
//     // const placeName = this.autocomplete.getPlace().name;
//     // const address = this.autocomplete.getPlace().formatted_address;
//     // console.log(lat, lng);
//     // console.log(placeName);
//     // console.log(address);
//     this.setState({ lat, lng });
//   }

//   render() {
//     return (
//       <LoadScript
//       googleMapsApiKey={mapsAPIKey}
//       libraries={libraries}>
//         <Autocomplete
//           onLoad={this.onLoad}
//           onPlaceChanged={this.onPlaceChanged}
//         >
//           <input
//             type="text"
//             name="location"
//             id="location"
//             placeholder="Search Here"
//             className="form-control"
//           />
//         </Autocomplete>
//         <GoogleMap
//           mapContainerStyle={mapStyle}
//           center={this.state}
//           zoom={15}
//           options={options}
//         >
//           <Marker
//             position={this.state}
//           />
//         </GoogleMap>
//       </LoadScript>
//     );
//   }
// }
