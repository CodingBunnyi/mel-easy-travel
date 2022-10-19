import React from 'react';
import { 
  Layer,
  Source,
} from 'react-map-gl';
import busMetroRouteData from '../../../../../data/BusMetroRoutes.json'

const BusMetroRouteLayer = ({layerStatus}) => {
  const layerStyle = {
    id: 'metroRoute',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#f06292',
      'line-width': 2
    }
  };
  return(
    <>
      { layerStatus.busMetroRoute ? (
        <Source id="metroRoute" type="geojson" data={ busMetroRouteData }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}

export default BusMetroRouteLayer;