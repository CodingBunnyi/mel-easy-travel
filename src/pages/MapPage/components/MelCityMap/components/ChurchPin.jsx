/* eslint-disable no-unused-vars */
import { convertLength } from '@mui/material/styles/cssUtils';
import { pointer } from 'd3-selection';
import React, {useMemo} from 'react';
import church from '../../../../../assets/images/church.svg';
import college from '../../../../../assets/images/college.svg';
import metro from '../../../../../assets/images/metro.svg';
import outdoor from '../../../../../assets/images/outdoor.svg';
import police from '../../../../../assets/images/police.svg';
import publicBuilding from '../../../../../assets/images/publicBuilding.svg';
import guest from '../../../../../assets/images/guest.svg';
import cemetery from '../../../../../assets/images/cemetery.svg';
import sport from '../../../../../assets/images/sport.svg';
import museum from '../../../../../assets/images/museum.svg';
import boat from '../../../../../assets/images/boat.svg';
import bridge from '../../../../../assets/images/bridge.svg';
import casino from '../../../../../assets/images/casino.svg';
import cinema from '../../../../../assets/images/cinema.svg';
import construction from '../../../../../assets/images/construction.svg';
import exhi from '../../../../../assets/images/exhi.svg';
import factory from '../../../../../assets/images/factory.svg';
import fire from '../../../../../assets/images/fire.svg';
import fish from '../../../../../assets/images/fish.svg';
import gym from '../../../../../assets/images/gym.svg';
import hospital from '../../../../../assets/images/hospital.svg';
import hotel from '../../../../../assets/images/hotel.svg';
import house from '../../../../../assets/images/house.svg';
import land from '../../../../../assets/images/land.svg';
import store from '../../../../../assets/images/store.svg';
import threatre from '../../../../../assets/images/threatre.svg';
import retail from '../../../../../assets/images/retail.svg';
import squre from '../../../../../assets/images/squre.svg';
import tower from '../../../../../assets/images/tower.svg';
import indoor from '../../../../../assets/images/indoor.svg';
import yard from '../../../../../assets/images/yard.svg';
import synagogue from '../../../../../assets/images/synagogue.svg';

const data = {
  "Railway Station": metro, 
  "Retail/Office/Carpark": publicBuilding, 
  "Informal Outdoor Facility (Park/Garden/Reserve)": outdoor, 
  "Church": church, 
  "Private Hospital": hospital, 
  "Synagogue": synagogue, 
  "Police Station": police, 
  "Visitor Centre": guest, 
  "Major Sports &amp; Recreation Facility": sport, 
  "Cemetery": cemetery, 
  "Retail": retail, 
  "Primary Schools": college, 
  "Art Gallery/Museum": museum, 
  "Secondary Schools": college, 
  "School - Primary and Secondary Education": college, 
  "Theatre Live": threatre, 
  "Tertiary (University)": college, 
  "Public Buildings": publicBuilding, 
  "Retail/Office": retail, 
  "Office": publicBuilding, 
  "Government Building": publicBuilding, 
  "Outdoor Recreation Facility (Zoo, Golf Course)": squre, 
  "Function/Conference/Exhibition Centre": exhi, 
  "Vacant Land - Undeveloped Site": land, 
  "Casino": casino, 
  "Public Hospital": hospital, 
  "Film &amp; RV Studio": cinema, 
  "Current Construction Site": construction, 
  "Marina": boat, 
  "Observation Tower/Wheel": tower, 
  "Further Education": college, 
  "Hostel": hotel, 
  "Current Construction Site - Commercial": construction, 
  "Cinema": cinema, 
  "Indoor Recreation Facility": indoor, 
  "Dwelling (House)": house, 
  "Industrial (Manufacturing)": factory, 
  "Store Yard": yard, 
  "Fire Station": fire, 
  "Retail/Office/Residential/Carpark": retail, 
  "Gymnasium/Health Club": gym, 
  "Aquarium": fish, 
  "Retail/Residential": retail, 
  "Bridge": bridge, 
  "Department Store": store, 
  "Medical Services": hospital, 
};
  
function ChurchPin({ poi }) {

  const customPins = useMemo(
    () =>      
      <img 
        height={ 25 }
        style={ { 'cursor': 'pointer'} }
        key= { poi.SubTheme }
        src={ data[poi.SubTheme] }
      />
  );

  return (
    
    [customPins]
      
  );
}

export default React.memo(ChurchPin);