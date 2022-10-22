/* eslint-disable no-unused-vars */
import React from 'react';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import './AboutMelEasyTravelPage.scss';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dev1Image from '../../assets/images/dev_1.png';
import avatarZ from '../../assets/images/avatar.JPG';

const AboutMelEasyTravelPage = () => {
  const theme = useTheme();
  return(
    <Container sx={ { mt: 4, mb: 4 } }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          <Paper
            sx={ {
              p: 5,
              display: 'flex',
              flexDirection: 'column',
            } }
          >
            <h1 className="about-title">About MelEasy</h1>
            <p1 className="p1">MelEasy can help users query the latest Twitter comments by clicking on the location on the map, and generate visual graphics based on Twitter and other data to help users travel better. At the same time, users can check the weather in Melbourne on the project.</p1>
            <h2 className="contact-title">Contact us</h2>

            <Grid container spacing={ 3 }>
              <Grid item xs={ 12 } md={ 12 } lg={ 6 }>
                <Card variant="outlined" sx={ { display: 'flex', height: '180px' } }>
                  <CardMedia
                    component="img"
                    image={ Dev1Image }
                    alt="dev1 image"
                    style={ {width: 170} }
                  />

                  <Box sx={ { display: 'flex', flexDirection: 'column', overflowY: 'scroll' } } >
                    <CardContent sx={ { flex: '1 0 auto' } }>
                      <Typography component="div" variant="h5">
                        Yuhan Qian
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: yuhqian1@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Student ID: 1244574
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={ 12 } md={ 12 } lg={ 6 }>
                <Card variant="outlined" sx={ { display: 'flex', height: '180px' } }>
                  <CardMedia
                    component="img"
                    image={ Dev1Image }
                    alt="dev1 image"
                    style={ {width: 170} }
                  />

                  <Box sx={ { display: 'flex', flexDirection: 'column', overflowY: 'scroll' } } >
                    <CardContent sx={ { flex: '1 0 auto' } }>
                      <Typography component="div" variant="h5">
                        Cheng Chen
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: yuhqian1@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        jn sakjd fnjksnk fjnsak jnfksn kfjn sakf ndkj sanf jsnk jdfnkj snfkj skfn
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={ 12 } md={ 12 } lg={ 6 }>
                <Card variant="outlined" sx={ { display: 'flex', height: '180px' } }>
                  <CardMedia
                    component="img"
                    image={ avatarZ }
                    alt="dev1 image"
                    style={ {width: 170, 
                      height: 170,
                      borderRadius: 150 / 2,} }
                  />

                  <Box sx={ { display: 'flex', flexDirection: 'column', overflowY: 'scroll' } } >
                    <CardContent sx={ { flex: '1 0 auto' } }>
                      <Typography component="div" variant="h5">
                        Xiaoxi Zhang
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: xiaoxzhang2@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Student ID: 1226240
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={ 12 } md={ 12 } lg={ 6 }>
                <Card variant="outlined" sx={ { display: 'flex', height: '180px' } }>
                  <CardMedia
                    component="img"
                    image={ Dev1Image }
                    alt="dev1 image"
                    style={ {width: 170, } }
                  />

                  <Box sx={ { display: 'flex', flexDirection: 'column', overflowY: 'scroll' } } >
                    <CardContent sx={ { flex: '1 0 auto' } }>
                      <Typography component="div" variant="h5">
                        Peicong Shangguan
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: pshangguan@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Student ID: 1222843
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
)}

export default AboutMelEasyTravelPage;