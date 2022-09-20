import React from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// const container = document.querySelector('#map');
// let map = ReactDOM.createRoot(container);

// const loader = new Loader({
//   apiKey: process.env.GOOGLE_MAPS_API_KEY,
//   version: 'weekly'
// });

// loader.load().then(() => {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8
//   });
// });

export default class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <h1>Hey</h1>;
  }
}
