import React, { useState, useEffect } from 'react';
import './Weather.scss';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';



export default function Weather({weatherData, setPage}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  const handleClick = () => {
    setPage('Weather');
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    var timerID = setInterval( () => setTime(new Date().toLocaleTimeString()), 1000 );
    return function cleanup() {
        // eslint-disable-next-line no-undef
        clearInterval(timerID);
      };
   });

  return (
    <React.Fragment>
      <Typography color="text.secondary" sx={ { flex: 1 } }>
        {new Date().toDateString()} {time}
      </Typography>

      <Typography>
        <span className="city-name">Melbourne</span>
      </Typography>

      <div className="temp-and-icon">
        <Typography>
          <span className="temp">{weatherData.main.temp} &#176; </span>
        </Typography>

        <img className="weather-icon" src={ `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` } alt={ weatherData.weather[0].main }/>
      </div>

      <Typography  sx={ { flex: 1 } }>
        Humidity: {weatherData.main.humidity}
      </Typography>

      <Typography  sx={ { flex: 1 } }>
        Wind: {weatherData.wind.speed}
      </Typography>

      <div>
        <Link color="primary" to="/weather" onClick={ handleClick }>
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}