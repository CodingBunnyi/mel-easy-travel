import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from './components/Weather/Weather';
import Map from '../../pages/MapPage/MapPage';
import LoadingBox from '../../app/components/LoadingBox/LoadingBox';

const DashboardPage = ({ weatherData, weatherLoading }) => (
  <Container sx={ { mt: 4, mb: 4 } }>
    <Grid container spacing={ 3 }>

      <Grid item xs={ 12 } md={ 5 } lg={ 4 }>
        <Paper
          sx={ {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 330,
          } }
        >
          { weatherLoading ? <LoadingBox /> : <Weather weatherData={ weatherData }/> }
        </Paper>
      </Grid>

      <Grid item xs={ 12 } md={ 7 } lg={ 8 }>
        <Paper
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            height: 330,
            overflow: 'hidden'
          } }
                >
          <Map/>
        </Paper>
      </Grid>
    </Grid>
  </Container>
)

export default DashboardPage;