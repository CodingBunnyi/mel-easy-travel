import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mel_POIs_Data from '../../../data/Melbourne_POIs_MGA.json'

export default function MelCityMap() {
    
  const MAPBOX_TOKEN =
  "pk.eyJ1Ijoib25lbm5pbmUiLCJhIjoiY2w5NDd2OHFtMDFyYzN2dGJlN3hqb29uciJ9.adU0kBOA9mvrm5lkSpcHvQ"

  const [selected, setSelected] = useState(null);

  return (
    <Map
      initialViewState={ {
        latitude: -37.810454,
        longitude: 144.962379,
        zoom: 14
      } }
      style = { {width: 1000, height: 600} }
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken = { MAPBOX_TOKEN }
    >
      {Mel_POIs_Data.map(poi => (
        // eslint-disable-next-line react/jsx-key
        <Marker 
          longitude= { poi.longitude }
          latitude= { poi.latitude }
          color= 'red'
        >
          <button onClick= { e => {
            e.preventDefault();
            setSelected(poi)
          } }  >
            Click me
          </button>
        </Marker>
        ))}

      {selected ? (
        <Popup
          longitude= { selected.longitude }
          latitude= { selected.latitude }
          onClose= { () => {
            setSelected(null);
          } }
          >
          llllllllllllll
          This is my popup
        </Popup>
         ) :null }

    </Map>

    
  );
}
