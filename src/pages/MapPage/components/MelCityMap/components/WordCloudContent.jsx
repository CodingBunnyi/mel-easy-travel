/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import "d3-transition";
import ReactWordcloud from 'react-wordcloud';
import Typography from '@mui/material/Typography';
import { select } from "d3-selection";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const WordCloudContent = ({ wordCloud }) => {
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

  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text
        .transition()
        .attr("background", "white")
        .attr("font-style", isActive ? "oblique" : "none")
    };
  }
  
  const callbacks = {
    getWordTooltip: (word) =>
      `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback("onWordClick"),
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver")
  };

  return(
    <div style={ { width: '550px' } }>
      <Typography component="p" color="text.secondary">What are people talking about here？ </Typography>
      { wordCloud.length === 0 ? <div>No word cloud data in last 7 days.</div> : <ReactWordcloud options={ options } callbacks={ callbacks } words={ wordCloud } />}
    </div>
  )
}

export default WordCloudContent;