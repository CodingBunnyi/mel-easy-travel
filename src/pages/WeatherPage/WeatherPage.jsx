import { Typography } from '@mui/material';
import React from 'react';
// import 'leaflet/dist/leaflet.css';
import timeConverter from '../../utils/timeConverter';
import WeatherLineChart from './components/WeatherChart/WeatherChart';
import WeatherMap from './components/WeatherMap/WeatherMap';

const WeatherPage = ({weatherData}) => {

  return(
    <>
      <div>
        <Typography>
          <span>8-day forecast</span>
        </Typography>

        {weatherData.daily.map((item, index) => {
          const { day, date, month } = timeConverter(item.dt);
          const  time =  day + ', ' + date + ' ' + month;
          return(
            <div key={ index }>
              <span>{time}</span>
              <img src={ `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` } alt={ item.weather[0].main }/>
              <span>{item.temp.min} / {item.temp.max}°C </span>
              <span>{item.weather[0].description}</span>
            </div>
          )
        })}

        <WeatherLineChart weatherData={ weatherData }/>
        
        <div>
          <WeatherMap />
        </div>
      </div>   
    </>
)}

export default WeatherPage;