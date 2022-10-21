import React from 'react';
import { 
  Layer,
  Source,
} from 'react-map-gl';
import cafe from '../../../../../data/Cafe.json'

const RestaurantLayer = ({layerStatus}) => {
  const layerStyle = {
    id: 'cafe',
    type: 'pointer',
  };
  return(
    <>
      { layerStatus.busMetroRoute ? (
        <Source id="metroRoute" type="geojson" data={ cafe }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}

export default RestaurantLayer;