import React from 'react';

const WeatherPage = ({weatherData}) => (
  <>
    <div>
      {JSON.stringify(weatherData)}
    </div>   
  </>
)

export default WeatherPage;