import React, { useEffect, useState, useMemo } from 'react';
import Map, { 
  Marker, 
  Popup,
  ScaleControl,
  FullscreenControl,
  NavigationControl,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Mel_POIs_Data from '../../../data/Melbourne_POIs_MGA.json'
import ChurchPin from './ChurchPin';
import {createRoot} from 'react-dom/client';
import ControlPanel from './ControlPanel';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MelCityMap() {
    
  const MAPBOX_TOKEN =
  "pk.eyJ1Ijoib25lbm5pbmUiLCJhIjoiY2w5NDd2OHFtMDFyYzN2dGJlN3hqb29uciJ9.adU0kBOA9mvrm5lkSpcHvQ"

  const [selected, setSelected] = useState(null); //onClick status of Mel_POIs_Data
  const [checkStatus, setcheckStatus] = useState(false); //checkBox status of Mel_POIs_Data

  useEffect(() => {
    
  }, [selected, checkStatus]);

  //pass & reveive data from ControlPanel
  const getChiledrenValue = (val) => {
    setcheckStatus(val)
  }

  const pins = useMemo(
    () =>
      Mel_POIs_Data.map(poi => (
        <Marker 
          longitude= { poi.longitude }
          latitude= { poi.latitude }
          color= 'red'
          key = { poi.ID }
          onClick= { e => {
            e.originalEvent.stopPropagation();
            setSelected(poi)
          } }
        >
          <ChurchPin />
        </Marker>
      )),
    []
  );
  return (
    <Map
      initialViewState={ {
        latitude: -37.810454,
        longitude: 144.962379,
        zoom: 14,
        bearing: 0,
        pitch: 0
      } }
      style = { {width: Window.width, height: 500} }
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken = { MAPBOX_TOKEN }
    >
      <FullscreenControl position="top-left" />
      <ScaleControl position="bottom-left" />
      <NavigationControl position="top-left" />
      <ControlPanel position="top-right" getValue={ getChiledrenValue } />

      {checkStatus ? (
        [pins]
      ):true }

      {selected ? (
        <Popup
          longitude= { selected.longitude }
          latitude= { selected.latitude }
          onClose= { () => {
            setSelected(null);
          } }
          >
          <Box>
            <Typography variant="h6" >
              Theme: {selected.Theme}
            </Typography>

            <Typography variant="subtitle1" >
              Subtheme: {selected.SubTheme}
            </Typography>

          </Box>
        </Popup>
         ) : null}

    </Map>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<MelCityMap />);
}