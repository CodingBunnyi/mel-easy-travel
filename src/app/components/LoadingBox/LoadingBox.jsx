import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = () => (
  <Box
    display="flex"
    alignItems="center"
  >
    <CircularProgress />
    <div style={ {'margin-left': '16px'} }>LOADING...</div>
  </Box> 
)

export default LoadingBox