import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from './components/Weather/Weather';
// eslint-disable-next-line no-unused-vars
import Map from './components/Map/Map';
import TouristAttraction from './components/TouristAttraction/TouristAttraction';

const DashboardPage = ({ weatherData }) => (
  <Box
    component="main"
    sx={ {
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
    } }
        >

    <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
      <Grid container spacing={ 3 }>

        {/* Weather */}

        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
          <Paper
            sx={ {
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
            } }
                >
            <Weather weatherData={ weatherData }/>
          </Paper>
        </Grid>

        {/* Chart */}

        <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
          <Paper
            sx={ {
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
            } }
                >
            <TouristAttraction />
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
  </Box>
)

export default DashboardPage;