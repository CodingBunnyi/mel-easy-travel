import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function ControlPanel({ layerStatus, setLayerStatus }) {

  const handleBusLayerChange = (layer) => {
    setLayerStatus({...layerStatus, [layer]: !layerStatus[layer]})
  }
  
  return (
    <div style={ {
      position: 'absolute',
      top: 0,
      left: 50,
      maxWidth: 300,
      background: '#fff',
      padding: 12,
      margin: 10,
      color: '#6b6b76',
    } } >
      <h3>Melbourne Tourist Guide</h3>

      <FormGroup>
        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.POI } onChange= { () => handleBusLayerChange('POI') } /> } 
          label="Point of Interest" 
        />

        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.heatMap } onChange= { () => handleBusLayerChange('heatMap') } /> } 
          label="Social Network HeatMap" 
        />

        <FormControlLabel control= { <Checkbox /> } label="Restaurant" />

        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.busRoute } onChange= { () => handleBusLayerChange('busRoute') } /> } 
          label="Bus Route" 
        />

        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.busMetroRoute } onChange= { () => handleBusLayerChange('busMetroRoute') } /> } 
          label="Bus Metro Route" 
        />

        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.bicycleRoute } onChange= { () => handleBusLayerChange('bicycleRoute') } /> } 
          label="Bicycle Route" 
        />

      </FormGroup>
    </div>

    
  );
}

export default React.memo(ControlPanel);