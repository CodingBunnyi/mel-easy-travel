import React, { useEffect, useState, useMemo } from 'react';
import Map, { 
  Marker, 
  Popup,
  ScaleControl,
  FullscreenControl,
  NavigationControl,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { getTwitterData, getWordCloudData, getTwitterDailyData } from '../../../../utils/twitterDataApi';
import Mel_POIs_Data from '../../../../data/Melbourne_POIs_MGA.json'
import restaurant from '../../../../data/restaurant.json'

import ChurchPin from './components/ChurchPin';
import Pin from './components/Pin';
import {createRoot} from 'react-dom/client';
import ControlPanel from './components/ControlPanel';
import WordCloudContent from './components/WordCloudContent';
import LoadingBox from '../../../../app/components/LoadingBox/LoadingBox';
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
import DailyBarChart from './components/DailyBarChart';
import { HeatMapLayer, CircleLayer }from './components/HeatMapLayer';
import { getHeatMapData } from '../../../../utils/twitterDataApi';

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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); //onClick Restaurant of Mel_POIs_Data
  const [selectedTwitterInfo, setSelectedTwitterInfo] = useState({count: 0, data: []});
  const [wordCloud, setWordCould] = useState([]);
  const [twitterDailyData, setTwitterDailyData] = useState([]);
  const [loading, setLoading] = useState({
    twitterData: false,
    wordCloud: false,
    twitterDailyData: false,
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

  //Point of Interest handle click
  const handleClickPOI = async (e, poi) => {
    e.originalEvent.stopPropagation();
    setSelected(poi)
    setLoading({
      twitterData: true,
      wordCloud: true,
      twitterDailyData: true,
    });
    setSelectedTwitterInfo({count: 0, data: []});
    setWordCould([]);
    setTwitterDailyData([]);

    const twitterResponse = await getTwitterData(poi.longitude, poi.latitude, 0.5, 10)
    if (twitterResponse.status === 200) {
      setSelectedTwitterInfo(twitterResponse.data)
      setLoading({...loading, twitterData: false});
    }

    const wordCloudResponse = await getWordCloudData(poi.ID)
    if (wordCloudResponse.status === 200) {
      setWordCould(wordCloudResponse.data.word_freq)
      setLoading({...loading, wordCloud: false});
    }

    const twitterDailyResponse = await getTwitterDailyData(poi.ID)
    if (twitterDailyResponse.status === 200) {
      setTwitterDailyData(twitterDailyResponse.data.data)
      setLoading({...loading, twitterDailyData: false});
    }
  }

  //Restaurant handle click
  const handleClickRestaurant = async (e, point) =>{
    e.originalEvent.stopPropagation();
    setSelectedRestaurant( point )
  }

  useEffect(() => {

  }, [selected, selectedTwitterInfo, selectedRestaurant]);


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
      Mel_POIs_Data?.map(poi => {
        return(
          <Marker 
            longitude= { poi.longitude }
            latitude= { poi.latitude }
            color= 'red'
            key = { poi.ID }
            onClick= { (e) => handleClickPOI(e, poi) }
        >
            <ChurchPin poi={ poi } />
          </Marker>
        )}),
    []
  );

  const restaurantPins = useMemo(
    () =>
    restaurant?.map(point => {
        return(
          <Marker 
            longitude= { point.longitude }
            latitude= { point.latitude }
            color= 'red'
            key = { point.ID }
            onClick= { (e) => handleClickRestaurant(e, point) }
        >
            <Pin/>
          </Marker>
        )}),
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
      mapStyle="mapbox://styles/mapbox/light-v10"
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

      {layerStatus.restaurant ? (
        [restaurantPins]
      ):true }

      {selected ? (
        <Popup
          longitude= { selected.longitude }
          latitude= { selected.latitude }
          onClose= { () => {
            setSelected(null);
          } }
          maxWidth= { '620px' }
          style= { { width: '620px !important' } }        
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
              <Tab label="Daily Twitter Count" { ...a11yProps(2) } />
            </Tabs>
          </Box>

          <Box sx={ { width: '600px' , height: 450 , overflowY: 'scroll'} } >

            <TabPanel 
              value={ value } 
              index={ 0 } 
              sx={ { width: '100%' } }
              >
              
              <scroll-view scroll-y="true">  
                <List sx={ { width: '100%',  bgcolor: 'background.paper' } }  >
                
                  {loading.twitterData ?
                    <LoadingBox />
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
                        <img src={ tweet.photo_urls[0] } width={ '100%' } />
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

            <TabPanel value={ value } index={ 2 } height={ 100 } style={ {padding: 0} }>
              <DailyBarChart loading={ loading } twitterDailyData={ twitterDailyData }/>
            </TabPanel>

          </Box>
        </Popup>
         ) : null}

      {selectedRestaurant ? (
        <Popup
          longitude= { selectedRestaurant.longitude }
          latitude= { selectedRestaurant.latitude }
          onClose= { () => {
            setSelectedRestaurant(null);
          } }
          maxWidth= { '620px' }
          style= { { width: '620px !important' , borderRadius: 25 } }   
          key = { selectedRestaurant.ID }
        >
          <Box>
            <Typography variant="h6" >
              { selectedRestaurant.Description }
            </Typography>

            <Typography variant="title2" >
              { selectedRestaurant.BusinessAddress }
            </Typography>

          </Box>
        </Popup>
        ) : null }

    </Map>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<MelCityMap />);
}