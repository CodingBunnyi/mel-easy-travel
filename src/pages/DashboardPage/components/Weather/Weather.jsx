import * as React from 'react';
import './Weather.scss';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

export default function Weather({weatherData}) {
  
  return (
    <React.Fragment>
      <div className="city-name-container">
        <Typography>
          <span className="city-name">Melbourne</span>
        </Typography>
      </div>

      <div className="temp-and-icon">
        <Typography>
          {/* <span className="temp">{weatherData.main.temp} &#176; </span> */}
          <span className="temp">52.15 &#176; </span>
        </Typography>

        <img className="weather-icon" src={ `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` } alt={ weatherData.weather[0].main }/>
      </div>

      <Typography color="text.secondary" sx={ { flex: 1 } }>
        {/* {new Date().getDate()} */}
      </Typography>

      <div>
        <Link color="primary" href="#" onClick={ preventDefault }>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}