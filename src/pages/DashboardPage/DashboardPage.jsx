import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from './components/Weather/Weather';
import Map from '../../pages/MapPage/MapPage';
//import TouristAttraction from './components/TouristAttraction/TouristAttraction';

const DashboardPage = ({ weatherData }) => (
  <Container sx={ { mt: 4, mb: 4 } }>
    <Grid container spacing={ 3 }>

      {/* Weather */}

      <Grid item xs={ 12 } md={ 5 } lg={ 4 }>
        <Paper
          sx={ {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 330,
          } }
        >
          <Weather weatherData={ weatherData }/>
        </Paper>
      </Grid>

      {/* Chart */}

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

      {/* Recent Orders */}

      <Grid item xs={ 12 }>
        <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
          {/* <Map /> */}
        </Paper>
      </Grid>
    </Grid>

  </Container>
)

export default DashboardPage;