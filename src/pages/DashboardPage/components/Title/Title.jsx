

import * as React from 'react';
import Typography from '@mui/material/Typography';
import './Title.scss';
function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      <span className="title">{props.children}</span>
    </Typography>
  );
}


export default Title;