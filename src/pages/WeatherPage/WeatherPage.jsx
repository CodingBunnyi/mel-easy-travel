import { Typography } from '@mui/material';
import React from 'react';
import timeConverter from '../../utils/timeConverter';

const WeatherPage = ({weatherData}) => {

  return(
    <>
      <div>
        <Typography>
          <span>8-day forecast</span>
        </Typography>

        {weatherData.daily.map((item, index) => {
          const time = timeConverter(item.dt);
          return(
            <div key={ index }>
              <span>{time}</span>
              <img src={ `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` } alt={ item.weather[0].main }/>
              <span>{item.temp.min} / {item.temp.max}°C </span>
              <span>{item.weather[0].description}</span>
            </div>
          )
        })}
      </div>   
    </>
)}

export default WeatherPage;