import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MelCityMap() {

  return (
    <Map
      initialViewState={ {
        latitude: -37.810454,
        longitude: 144.962379,
        zoom: 14
      } }
      style = { {width: 1000, height: 600} }
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      // eslint-disable-next-line no-undef
      mapboxAccessToken = { 'pk.eyJ1Ijoib25lbm5pbmUiLCJhIjoiY2w5NDd2OHFtMDFyYzN2dGJlN3hqb29uciJ9.adU0kBOA9mvrm5lkSpcHvQ' }
    >
      <Marker longitude = { 144.962379 } latitude = { -37.810454 } color="red" />
    </Map>
  );
}

// eslint-disable-next-line no-undef
render(<MelCityMap />, document.body.appendChild(document.createElement('div')));