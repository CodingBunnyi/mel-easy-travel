import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { indigo } from '@mui/material/colors';

function Pin() {
  return (
    <FiberManualRecordIcon style={ { 'cursor': 'pointer'} } sx={ { color: indigo [300], fontSize: 7 } }/>
  );
}

export default React.memo(Pin);