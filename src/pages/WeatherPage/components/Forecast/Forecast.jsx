import React from 'react';
import timeConverter from '../../../../utils/timeConverter';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import './Forecast.scss';

const Forecast = ({ weatherData }) => {
  return(
    <Paper
      sx={ {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 550,
      } }
    >
      <Typography variant="h6">
        <span className="title">8-day forecast</span>
      </Typography>

      {weatherData.daily.map((item, index) => {
        const { day, date, month } = timeConverter(item.dt);
        const  time =  day + ', ' + date + ' ' + month;
        return(
          <div className="forecast-item" key={ index }>
            <span>{time}</span>
            <img src={ `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` } alt={ item.weather[0].main }/>
            <span>{item.temp.min} / {item.temp.max}°C </span>
            <span>{item.weather[0].description}</span>
          </div>
        )
      })}
    </Paper>
  )
}

export default Forecast;