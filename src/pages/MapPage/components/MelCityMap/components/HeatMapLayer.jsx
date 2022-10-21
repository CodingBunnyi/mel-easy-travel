import React from 'react';
import { 
  Layer,
  Source,
} from 'react-map-gl';

export const HeatMapLayer = ({layerStatus, heatMapData}) => {
  const MAX_ZOOM_LEVEL = 14;
  const layerStyle = {
    id: 'heatmap',
    type: 'heatmap',
    maxzoom: MAX_ZOOM_LEVEL,
    paint: {
      'heatmap-weight': {
        property: 'count',
        type: 'exponential',
        stops: [
          [0, 0],
          [260, 2]
        ]
      },

      'heatmap-intensity': {
        stops: [
          [11, 1],
          [14, 3]
        ]
      },
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(229, 115, 115,0)',
        0.2,
        'rgb(229, 115, 115)',
        0.4,
        'rgb(229, 115, 115)',
        0.6,
        'rgb(229, 115, 115)',
        0.8,
        'rgb(229, 115, 115)'
      ],
      'heatmap-opacity': {
        default: 1,
        stops: [
          [13, 1],
          [14, 0]
        ]
      },
      'heatmap-radius': {
        stops: [
          [11, 15],
          [14, 20]
        ]
      },
    }
  };
  return(
    <>
      { layerStatus.heatMap ? (
        <Source id="heatmap" type="geojson" data={ heatMapData }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}

export const CircleLayer = ({layerStatus, heatMapData}) => {
  const MIN_ZOOM_LEVEL = 13;
  const layerStyle = {
    id: 'poi-point',
    type: 'circle',
    minzoom: MIN_ZOOM_LEVEL,
    paint: {
      'circle-radius': {
        property: 'count',
        type: 'exponential',
        stops: [
          [{ zoom: 14, value: 1 }, 15],
          [{ zoom: 14, value: 260 }, 22],
          [{ zoom: 22, value: 1 }, 20],
          [{ zoom: 22, value: 260 }, 50]
        ]
      },
      'circle-color': {
        property: 'count',
        type: 'interval',
        stops: [
          [0, '#ffebee'],
          [20, '#ffcdd2'],
          [40, '#ef9a9a'],
          [60, '#e57373'],
          [80, '#ef5350'],
          [100, '#f44336'],
          [140, '#e53935'],
          [180, '#d32f2f'],
          [220, '#c62828'],
          [260, '#b71c1c'],

        ]
      },
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      'circle-opacity': {
        stops: [
          [13, 0],
          [14, 1]
        ]
      }
    }
  }

  return(
    <>
      { layerStatus.heatMap ? (
        <Source id="poi-point" type="geojson" data={ heatMapData }>
          <Layer { ...layerStyle } />
        </Source>) : null }
    </>

  )
}