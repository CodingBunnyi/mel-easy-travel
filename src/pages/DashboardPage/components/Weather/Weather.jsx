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
        <span className="time">{new Date().toDateString()} {time}</span>
      </Typography>

      <Typography>
        <span className="city-name">Melbourne</span>
      </Typography>

      <div className="temp-and-icon">
        <Typography>
          <span className="temp">{weatherData.current.temp} °C </span>
        </Typography>

        <img className="weather-icon" src={ `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png` } alt={ weatherData.current.weather[0].main }/>
      </div>

      <Typography sx={ { flex: 1 } }>
        <span className="description">Feels like {weatherData.current.feels_like}°C. {weatherData.current.weather[0].main}.</span>
      </Typography>

      <Typography  sx={ { flex: 1 } }>
        <span className="addition-info">Humidity: {weatherData.current.humidity}%</span>
      </Typography>

      <Typography  sx={ { flex: 1 } }>
        <span className="addition-info">Wind: {weatherData.current.wind_speed}m/s</span>
      </Typography>

      <div>
        <Link color="primary" to="/weather" onClick={ handleClick }>
          View weather details
        </Link>
      </div>
    </React.Fragment>
  );
}