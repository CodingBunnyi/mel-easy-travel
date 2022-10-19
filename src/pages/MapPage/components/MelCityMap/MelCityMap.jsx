/* eslint-disable no-unused-vars */
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
  const [layerStatus, setLayerStatus] = useState({
    'POI': true,
    'restaurant': false,
    'busRoute': false,
  });

  const [value, setValue] = React.useState(0); //Tab

  // Tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickPOI = async (e, poi) => {
    e.originalEvent.stopPropagation();
    setSelected(poi)

    const twitterResponse = await getTwitterData(poi.longitude, poi.latitude, 0.5, 10)
    if (twitterResponse.status === 200) {
      setSelectedTwitterInfo(twitterResponse.data)
    }

    const wordCloudResponse = await getWordCloudData(poi.ID)
    if (wordCloudResponse.status === 200) {
      setWordCould(wordCloudResponse.data.word_freq)
    }
  }

  useEffect(() => {
    
  }, [selected, selectedTwitterInfo]);

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
          style= { { height:250 } }        
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

          <Box sx={ { width: '100%' , height: 450 , overflow: 'scroll'} } >

            <TabPanel 
              value={ value } 
              index={ 0 } 
              sx={ { width: '100%' } }
              >
              
              <scroll-view scroll-y="true">  
                <List sx={ { width: '100%',  bgcolor: 'background.paper' } }  >
                
                  {(selectedTwitterInfo.count == 0  ) ? (
                    
                    <Box>
                      <Typography variant="body2" >
                        No Recent Twitter in 7 days.
                      </Typography>
                    </Box>
                
                  ) : null }

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
              <WordCloudContent wordCloud={ wordCloud }/>
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