import React from 'react';
import { 
  Layer,
  Source,
} from 'react-map-gl';
import busRouteData from '../../../../../data/BusRegionalRoutes.json'

const BusRouteLayer = ({layerStatus}) => {
  const layerStyle = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#4dd0e1',
      'line-width': 2
    }
  };
  return(
    <>
      { layerStatus.busRoute ? (
        <Source id="route" type="geojson" data={ busRouteData }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}

export default BusRouteLayer;