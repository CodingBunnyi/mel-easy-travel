import React from 'react';
// import 'leaflet/dist/leaflet.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import WeatherChart from './components/WeatherChart/WeatherChart';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import Forecast from './components/Forecast/Forecast';

import './WeatherPage.scss';

const WeatherPage = ({weatherData}) => {

  return(
    <Container sx={ { mt: 4, mb: 4 } }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } md={ 6 } lg={ 5 }>
          <WeatherInfo weatherData={ weatherData } />
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 7 }>
          <Forecast weatherData={ weatherData } />
        </Grid>

        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          <WeatherChart weatherData={ weatherData }/>
        </Grid>
      </Grid>
    </Container>   
)}

export default WeatherPage;