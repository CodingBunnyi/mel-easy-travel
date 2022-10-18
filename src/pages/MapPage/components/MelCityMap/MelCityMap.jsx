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
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
//import ReactIScroll from 'react-iscroll';


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

// Stack
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

//Avatar
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30, 
      height: 30
    },
    children: `${ name.split(' ')[0][0] }${ name.split(' ')[1][0] }`,
  };
}

//Avatar Color
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function MelCityMap() {
    
  const MAPBOX_TOKEN =
  "pk.eyJ1Ijoib25lbm5pbmUiLCJhIjoiY2w5NDd2OHFtMDFyYzN2dGJlN3hqb29uciJ9.adU0kBOA9mvrm5lkSpcHvQ"

  const [selected, setSelected] = useState(null); //onClick status of Mel_POIs_Data
  const [checkStatus, setcheckStatus] = useState(true); //checkBox status of Mel_POIs_Data
  // eslint-disable-next-line no-unused-vars
  const [selectedTwitterInfo, setSelectedTwitterInfo] = useState({count: 0, data: []});
  const [wordCloud, setWordCould] = useState([]);

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

    const wordCloudResponse = await getWordCloudData('UniversityOfMelbourne')
    if (wordCloudResponse.status === 200) {
      setWordCould(wordCloudResponse.data.word_freq)
    }
  }

  useEffect(() => {
    
  }, [selected, checkStatus, selectedTwitterInfo]);

  //pass & reveive data from ControlPanel
  const getChiledrenValue = (val) => {
    setcheckStatus(val)
  }

  const pins = useMemo(
    () =>
      Mel_POIs_Data.map(poi => (
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
        latitude: -37.810454,
        longitude: 144.962379,
        zoom: 14,
        bearing: 0,
        pitch: 0
      } }
      style = { {width: '100vw' , height: '100vh'} }
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken = { MAPBOX_TOKEN }
    >
      <FullscreenControl position="top-left" />
      <ScaleControl position="bottom-left" />
      <NavigationControl position="top-left" />
      <ControlPanel position="top-left" getValue={ getChiledrenValue } />

      {checkStatus ? (
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

          <Box sx={ { width: '100%' } } >

            <TabPanel 
              value={ value } 
              index={ 0 } 
              sx={ { width: '100%' } }
              >
              
              <scroll-view scroll-y="true">  
                <Stack spacing={ 1 }  sx={ { width: '100%'} }  >
                    
                  <Item>
                    {(selectedTwitterInfo.data !== undefined && selectedTwitterInfo.data[0] !== undefined) ? (
                      <Box>
                        <Avatar { ...stringAvatar( selectedTwitterInfo.data[0].author ) } />
                        
                        <Typography variant="body2" >
                          {selectedTwitterInfo.data[0].author } :{selectedTwitterInfo.data[0].clean_text }
                        </Typography>
                      </Box>
                      
                      ) : null }

                  </Item>

                  <Item>
                    {(selectedTwitterInfo.data !== undefined && selectedTwitterInfo.data[1] !== undefined) ? (
                      <Box>
                        <Avatar { ...stringAvatar( selectedTwitterInfo.data[1].author ) } />
                        
                        <Typography variant="body2" >
                          {selectedTwitterInfo.data[1].author } :{selectedTwitterInfo.data[1].clean_text }
                        </Typography>
                      </Box>
                      
                      ) : null }

                  </Item>

                  <Item>
                    {(selectedTwitterInfo.data !== undefined && selectedTwitterInfo.data[2] !== undefined) ? (
                      <Box>
                        <Avatar { ...stringAvatar( selectedTwitterInfo.data[2].author ) } />
                        
                        <Typography variant="body2" >
                          {selectedTwitterInfo.data[2].author } :{selectedTwitterInfo.data[2].clean_text }
                        </Typography>
                      </Box>
                      
                      ) : null }

                  </Item>
                </Stack>
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