import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

const DataPage = () => (
  <Container sx={ { mt: 4, mb: 4 } }>
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
        <Paper
          sx={ {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            // height: 330,
          } }
        >
          <List sx={ { width: '100%',bgcolor: 'background.paper' } }>
            <a href='https://openweathermap.org/' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Weather Data API" secondary="https://openweathermap.org/" />
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/BusMetroRoutes.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Bus Metro Routes" secondary="http://localhost:3000/data/BusMetroRoutes.json"/>
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/BusRegionalRoutes.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Bus Regional Routes" secondary="http://localhost:3000/data/BusRegionalRoutes.json"/>
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/MelbourneBicycleRoutesMGA.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Melbourne Bicycle Routes" secondary="http://localhost:3000/data/MelbourneBicycleRoutesMGA.json"/>
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/wind-speed-description.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Wind Speed Description" secondary="http://localhost:3000/data/wind-speed-description.json"/>
              </ListItemButton>
            </a>


          </List>

        </Paper>
      </Grid>
    </Grid>
  </Container>
)

export default DataPage;