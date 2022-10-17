import React, { useState, useEffect } from 'react';
import './Weather.scss';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';
import getWindSpeedDescription from '../../../../utils/getWindSpeedDescription';
import Title from '../Title/Title';



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
      <Title>Weather</Title>

      <Typography color="text.secondary" sx={ { flex: 1 } }>
        <span className="time">{new Date().toDateString()} {time}</span>
      </Typography>

      <Typography variant="h6">
        <span className="city-name">Melbourne, AU</span>
      </Typography>

      <div className="temp-and-icon">
        <Typography>
          <span className="temp">{weatherData.current.temp} °C </span>
        </Typography>

        <img className="weather-icon" src={ `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png` } alt={ weatherData.current.weather[0].main }/>
      </div>

      <Typography sx={ { flex: 1 } }>
        <span className="description">
          {`Feels like ${weatherData.current.feels_like}°C. `}
          {`${capitalizeFirstLetter(weatherData.current.weather[0].description)}. `}
          {`${getWindSpeedDescription(weatherData.current.wind_speed)}.`}
        </span>
      </Typography>

      <div className="weather-addition-container">
        <Typography className="weather-addition" sx={ { flex: 1 } }>
          <span>Humidity: {weatherData.current.humidity}%</span>
        </Typography>

        <Typography className="weather-addition" sx={ { flex: 1 } }>
          <span>Wind: {weatherData.current.wind_speed}m/s</span>
        </Typography>
      </div>

      <div>
        <Link color="primary" to="/weather" onClick={ handleClick }>
          View weather details
        </Link>
      </div>
    </React.Fragment>
  );
}