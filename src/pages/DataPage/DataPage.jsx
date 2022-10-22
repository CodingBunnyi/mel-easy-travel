import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';


const DataPage = () => (
  <Container sx={ { mt: 4, mb: 4 } }>
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
        <Paper
          sx={ {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
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

                <ListItemText primary="Metro Routes" secondary="http://localhost:3000/data/BusMetroRoutes.json"/>
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

            <a href='https://developer.twitter.com/en/docs/twitter-api' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Twitter Data Api" secondary="https://developer.twitter.com/en/docs/twitter-api"/>
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/Melbourne_POIs_MGA.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Point of Interest" secondary="http://localhost:3000/data/Melbourne_POIs_MGA.json"/>
              </ListItemButton>
            </a>

            <a href='http://localhost:3000/data/restaurant.json' target="_blank" style={ {'text-decoration': 'none', 'color': 'inherit'} } rel="noreferrer">
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Restaurant" secondary="http://localhost:3000/data/restaurant.json"/>
              </ListItemButton>
            </a>

          </List>

        </Paper>
      </Grid>
    </Grid>
  </Container>
)

export default DataPage;