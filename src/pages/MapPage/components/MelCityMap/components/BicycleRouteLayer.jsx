import React from 'react';
import { 
  Layer,
  Source,
} from 'react-map-gl';
import bicycleRouteData from '../../../../../data/MelbourneBicycleRoutesMGA.json'

const BicycleRouteLayer = ({layerStatus}) => {
  const layerStyle = {
    id: 'bicycleRoute',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#ba68c8',
      'line-width': 2
    }
  };
  return(
    <>
      { layerStatus.bicycleRoute ? (
        <Source id="bicycleRoute" type="geojson" data={ bicycleRouteData }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}

export default BicycleRouteLayer;