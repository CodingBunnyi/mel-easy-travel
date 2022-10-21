import React, { useEffect, useState, useMemo } from 'react';
import Map, { 
  Marker, 
  Popup,
  ScaleControl,
  FullscreenControl,
  NavigationControl,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { getTwitterData, getWordCloudData } from '../../../../utils/twitterDataApi';
import Mel_POIs_Data from '../../../../data/Melbourne_POIs_MGA.json'
import ChurchPin from './components/ChurchPin';
import {createRoot} from 'react-dom/client';
import ControlPanel from './components/ControlPanel';
import WordCloudContent from './components/WordCloudContent';
import CircularProgress from '@mui/material/CircularProgress';
//import TabTwitter from './TabTwitter';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import BusRouteLayer from './components/BusRouteLayer';
import BicycleRouteLayer from './components/BicycleRouteLayer';
import BusMetroRouteLayer from './components/BusMetroRouteLayer';
import { HeatMapLayer, CircleLayer }from './components/HeatMapLayer';
// eslint-disable-next-line no-unused-vars
import { getHeatMapData, getWiKiPediaData } from '../../../../utils/twitterDataApi';

// Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${index}` }
      aria-labelledby={ `simple-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box sx={ { p: 3 } }>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Tab
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Tab
function a11yProps(index) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  };
}

export default function MelCityMap() {
    
  const MAPBOX_TOKEN =
  "pk.eyJ1Ijoib25lbm5pbmUiLCJhIjoiY2w5NDd2OHFtMDFyYzN2dGJlN3hqb29uciJ9.adU0kBOA9mvrm5lkSpcHvQ"

  const [selected, setSelected] = useState(null); //onClick status of Mel_POIs_Data
  const [selectedTwitterInfo, setSelectedTwitterInfo] = useState({count: 0, data: []});
  const [wordCloud, setWordCould] = useState([]);
  const [loading, setLoading] = useState({
    twitterData: false,
    wordCloud: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [wikiData, setWikiData] = useState([]);
  const [layerStatus, setLayerStatus] = useState({
    'POI': true,
    'restaurant': false,
    'busRoute': false,
    'busMetroRoute': false,
    'bicycleRoute': false,
    'heatMap': false,
  });

  const [value, setValue] = React.useState(0); //Tab
  const [heatMapData, setHeatMapData] = useState({})

  // Tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickPOI = async (e, poi) => {
    e.originalEvent.stopPropagation();
    setSelected(poi)
    setLoading({
      twitterData: true,
      wordCloud: true,
    });
    setSelectedTwitterInfo({count: 0, data: []});
    setWordCould([]);

    const twitterResponse = await getTwitterData(poi.longitude, poi.latitude, 0.5, 10)
    if (twitterResponse.status === 200) {
      setLoading({...loading, twitterData: false});
      setSelectedTwitterInfo(twitterResponse.data)
    }

    const wordCloudResponse = await getWordCloudData(poi.ID)
    if (wordCloudResponse.status === 200) {
      setLoading({...loading, wordCloud: false});
      setWordCould(wordCloudResponse.data.word_freq)
    }

    // const wikiDataResponse = await getWiKiPediaData(`${poi.FeatureName}`)
    // if (wikiDataResponse.status === 200) {
    //   // setWikiData()
    // }
  }

  useEffect(() => {

  }, [selected, selectedTwitterInfo]);


  useEffect(() => {
    const fetchHeatMapData = async () => {
      const {status, data} = await getHeatMapData();
      if (status === 200) {
        setHeatMapData(data)
      }
    }
    fetchHeatMapData();
  }, []);

  const pins = useMemo(
    () =>
      Mel_POIs_Data?.map(poi => (
        <Marker 
          longitude= { poi.longitude }
          latitude= { poi.latitude }
          color= 'red'
          key = { poi.ID }
          onClick= { (e) => handleClickPOI(e, poi) }
        >
          <ChurchPin />
        </Marker>
      )),
    []
  );

  return (
    
    <Map
      initialViewState={ {
        longitude: 144.962379,
        latitude: -37.810454,
        zoom: 14,
        bearing: 0,
        pitch: 0
      } }
      style = { {width: '100vw' , height: '100vh'} }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken = { MAPBOX_TOKEN }
    >
      <FullscreenControl position="top-left" />
      <ScaleControl position="bottom-left" />
      <NavigationControl position="top-left" />
      <ControlPanel position="top-left" layerStatus={ layerStatus } setLayerStatus={ setLayerStatus }/>
      <BusRouteLayer layerStatus={ layerStatus }/>
      <BicycleRouteLayer layerStatus={ layerStatus }/>
      <BusMetroRouteLayer layerStatus={ layerStatus }/>
      <HeatMapLayer layerStatus={ layerStatus } heatMapData={ heatMapData }/>
      <CircleLayer layerStatus={ layerStatus } heatMapData={ heatMapData }/>

      {layerStatus.POI ? (
        [pins]
      ):true }

      {selected ? (
        <Popup
          longitude= { selected.longitude }
          latitude= { selected.latitude }
          onClose= { () => {
            setSelected(null);
          } }
          maxWidth= { '600px' }
          style= { { width: '600px !important' } }        
        >
          <Box>
            <Typography variant="h6" >
              {selected.FeatureName}
            </Typography>
          </Box>

          <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
            
            <Tabs value={ value } onChange={ handleChange } >
              <Tab label="Twitter" { ...a11yProps(0) } />
              <Tab label="Word Cloud" { ...a11yProps(1) } />
            </Tabs>
          </Box>

          <Box sx={ { width: '600px' , height: 450 , overflow: 'scroll'} } >

            <TabPanel 
              value={ value } 
              index={ 0 } 
              sx={ { width: '100%' } }
              >
              
              <scroll-view scroll-y="true">  
                <List sx={ { width: '100%',  bgcolor: 'background.paper' } }  >
                
                  {loading.twitterData ?
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <CircularProgress />
                      <div style={ {'margin-left': '16px'} }>LOADING...</div>
                    </Box> 
                  
                    : ((selectedTwitterInfo.count == 0  ) ? (
                      <Box>
                        <Typography variant="body2" >
                          No Recent Twitter in 7 days.
                        </Typography>
                      </Box>
                    ) : null 
                  )}

                  {selectedTwitterInfo.data?.map(tweet => (
                    <>
                      <ListItem 
                        key={ tweet.tid }
                      >
                        <ListItemAvatar>
                          <Avatar src={ tweet.user_img } />
                        </ListItemAvatar>

                        <ListItemText
                          primary={ tweet.author }
                          secondary={ 
                            <React.Fragment>
                              <Typography
                                sx={ { display: 'inline' } }
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >

                              </Typography>

                              {tweet.text}

                            </React.Fragment>
                          }
                        />

                      </ListItem>

                      {(selectedTwitterInfo.photo_urls == 0  ) ? (
                    
                        <Divider variant="inset" component="li" />
      
                      ) : null }  
                      
                      <Box>
                        <img src={ tweet.photo_urls[0] } width={ 390 } />
                      </Box>
              
                      <Divider variant="inset" component="li" />
                    </>
                    )) }
                </List>
              </scroll-view>
            </TabPanel>

            <TabPanel value={ value } index={ 1 } height={ 100 } style={ {padding: 0} }>
              <WordCloudContent loading={ loading } wordCloud={ wordCloud }/>
            </TabPanel>

          </Box>
        </Popup>
         ) : null}

    </Map>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<MelCityMap />);
}