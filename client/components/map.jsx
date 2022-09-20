import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import MyMapComponent from './mymap';

export default class Map extends React.Component {

  render() {
    return (
      <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <MyMapComponent />
      </Wrapper>
    );
  }

}
