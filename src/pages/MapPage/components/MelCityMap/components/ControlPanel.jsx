/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles(() => ({
  controlPanel: {
    position: 'absolute',
    top: 0,
    left: 50,
    maxWidth: 300,
    background: '#fff',
    padding: 12,
    margin: 10,
    color: '#6b6b76',
  },
}))

function ControlPanel({ layerStatus, setLayerStatus }) {
  const classes = useStyles()

  const handleBusLayerChange = (layer) => {
    setLayerStatus({...layerStatus, [layer]: !layerStatus[layer]})
  }
  
  return (
    <div className= { classes.controlPanel } >
      <h3>Melbourne Tourist Guide</h3>

      <FormGroup>
        <FormControlLabel 
          control= { <Checkbox checked={ layerStatus.POI } onChange= { () => handleBusLayerChange('POI') } /> } 
          label="Point of Interest" 
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