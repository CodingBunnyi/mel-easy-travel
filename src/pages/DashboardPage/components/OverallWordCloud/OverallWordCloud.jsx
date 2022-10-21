/* eslint-disable no-unused-vars */
import React from 'react';
import Typography from '@mui/material/Typography';
import ReactWordcloud from 'react-wordcloud';

const OverallWordCloud = ({ overallWordCloudData }) => {
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [15, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  return(
    <div style={ { width: '550px' } }>
      {/* <Typography component="p" color="text.secondary">What are people talking about here？ </Typography> */}
      {/* {overallWordCloudData.length !== 0 ? <ReactWordcloud options={ options } words={ overallWordCloudData } /> : <div>No word cloud data in last 7 days.</div>} */}
    </div>
  )
}

export default OverallWordCloud;