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

function ControlPanel(props) {
  const classes = useStyles()

  const [checkStatus, setcheckStatus] = useState(false);

  function handleChangeCheck (e) {
    const status= e.target.checked
    setcheckStatus(status)
    props.getValue(status)

  } 
  useEffect(() => {
    
  }, [checkStatus]);
  
  return (
    <div className= { classes.controlPanel } >
      <h3>Melbourne Tourist Guide</h3>

      <FormGroup>
        <FormControlLabel 
          control= { <Checkbox defaultChecked onChange= { handleChangeCheck } /> } 
          label="Point of Interest" 
          />

        <FormControlLabel control= { <Checkbox /> } label="Restaurant" />
      </FormGroup>
    </div>

    
  );
}

export default React.memo(ControlPanel);