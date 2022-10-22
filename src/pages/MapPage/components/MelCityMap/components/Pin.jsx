import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { pink } from '@mui/material/colors';

function Pin() {
  return (
    <FiberManualRecordIcon style={ { 'cursor': 'pointer'} } sx={ { color: pink[300], fontSize: 7 } }/>
  );
}

export default React.memo(Pin);