import React, {useEffect, useState}from 'react';
import Paper from '@mui/material/Paper';
import WeatherMap from './WeatherMap/WeatherMap';
import Typography from '@mui/material/Typography';
import degToCompass from '../../../../utils/degToCompass';
import CompressIcon from '@mui/icons-material/Compress';
import NearMeIcon from '@mui/icons-material/NearMe';
import timeConverter24To12 from '../../../../utils/timeConverter24To12';
import timeConverter from'../../../../utils/timeConverter';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';
import getWindSpeedDescription from '../../../../utils/getWindSpeedDescription';
import LoadingBox from '../../../../app/components/LoadingBox/LoadingBox';
import './WeatherInfo.scss';

const WeatherInfo = ({ weatherData, weatherLoading }) => {
  const [time, setTime] = useState(new Date().toLocaleString('en', {timeZone: 'Australia/Melbourne'}));
  const windDirection = degToCompass(weatherData.current.wind_deg)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    var timerID = setInterval( () => setTime(new Date().toLocaleString('en', {timeZone: 'Australia/Melbourne'})), 1000 );
    return function cleanup() {
        // eslint-disable-next-line no-undef
        clearInterval(timerID);
      };
   });

  const getSunriseAndSunset = (dt) => {
    const { hour, min } = timeConverter(dt);
    const { newHour, time } = timeConverter24To12(hour);
    return `${newHour}:${min}${time}`;
  }

  return(
    <Paper
      sx={ {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 550,
      } }
      className="weather-info-paper"
    > <></>
      {weatherLoading ? <LoadingBox /> : 
      <div className="current-info-container">
        <Typography color="text.secondary" sx={ { flex: 1 } }>
          <span className="time">{`Melbourne Time: ${time}`}</span>
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

        <div className="addition-info-container">
          <Typography  className="addition-info" sx={ { flex: 1 } }>
            <span><NearMeIcon fontSize="inherit"/> {weatherData.current.wind_speed}m/s {windDirection}</span>
          </Typography>

          <Typography  className="addition-info" sx={ { flex: 1 } }>
            <span><CompressIcon fontSize="inherit"/> {weatherData.current.pressure}hPa</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>Humidity: {weatherData.current.humidity}%</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>UV: {weatherData.current.uvi}</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>Dew point: {weatherData.current.dew_point}°C</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>Visibility: {weatherData.current.visibility / 1000}km</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>Sunrise: {getSunriseAndSunset(weatherData.current.sunrise)}</span>
          </Typography>

          <Typography className="addition-info" sx={ { flex: 1 } }>
            <span>Sunset: {getSunriseAndSunset(weatherData.current.sunset)}</span>
          </Typography>
        </div>
      </div>}

      <div className="weather-map-container">
        <WeatherMap />
      </div>
      
    </Paper>
)}

export default WeatherInfo;