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
            <h1 className="about-title">About MelEasyTravel</h1>
            <p1 className="p1">MelEasyTravel is xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br></br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br></br>xxxxxxxxxxxxxxxxxxx.</p1>
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
                        Controbution: Mac Miller ksafkjnask jdn kjl ndfk j nsd kjlf nlkjsa ndfjk lnsajk dfnj ksdn fkjn sakjf nkjsd nflkjn sakjd fnjksnk fjnsak jnfksn kfjn sakf ndkj sanf jsnk jdfnkj snfkj skfn
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
                        Yuhan Qian
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: yuhqian1@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Controbution: Mac Miller ksafkjnask jdn kjl ndfk j nsd kjlf nlkjsa ndfjk lnsajk dfnj ksdn fkjn sakjf nkjsd nflkjn sakjd fnjksnk fjnsak jnfksn kfjn sakf ndkj sanf jsnk jdfnkj snfkj skfn
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
                        Yuhan Qian
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: yuhqian1@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Controbution: Mac Miller ksafkjnask jdn kjl ndfk j nsd kjlf nlkjsa ndfjk lnsajk dfnj ksdn fkjn sakjf nkjsd nflkjn sakjd fnjksnk fjnsak jnfksn kfjn sakf ndkj sanf jsnk jdfnkj snfkj skfn
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
                        Yuhan Qian
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Font-end Developer
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Email: yuhqian1@student.unimelb.edu.au
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Controbution: Mac Miller ksafkjnask jdn kjl ndfk j nsd kjlf nlkjsa ndfjk lnsajk dfnj ksdn fkjn sakjf nkjsd nflkjn sakjd fnjksnk fjnsak jnfksn kfjn sakf ndkj sanf jsnk jdfnkj snfkj skfn
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