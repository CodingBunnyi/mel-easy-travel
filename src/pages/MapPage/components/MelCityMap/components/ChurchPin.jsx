/* eslint-disable no-unused-vars */
import { convertLength } from '@mui/material/styles/cssUtils';
import { pointer } from 'd3-selection';
import React, {useMemo} from 'react';
import church from '../../../../../assets/images/church.svg';
import college from '../../../../../assets/images/college.svg';


const data = {
  "Railway Station": college, 
  "Retail/Office/Carpark": college, 
  "Informal Outdoor Facility (Park/Garden/Reserve)": church, 
  "Church": church, 
  "Private Hospital": church, 
  "Synagogue": church, 
  "Police Station": church, 
  "Visitor Centre": church, 
  "Major Sports &amp; Recreation Facility": church, 
  "Cemetery": church, 
  "Retail": church, 
  "Primary Schools": church, 
  "Art Gallery/Museum": church, 
  // {name: "Secondary Schools", icon: church}, 
  // {name: "School - Primary and Secondary Education", icon: church}, 
  // {name: "Theatre Live", icon: church}, 
  // {name: "Tertiary (University)", icon: church}, 
  // {name: "Public Buildings", icon: church}, 
  // {name: "Retail/Office", icon: church}, 
  // {name: "Office", icon: church}, 
  // {name: "Government Building", icon: church}, 
  // {name: "Outdoor Recreation Facility (Zoo, Golf Course)", icon: church}, 
  // {name: "Function/Conference/Exhibition Centre", icon: church}, 
  // {name: "Vacant Land - Undeveloped Site", icon: church}, 
  // {name: "Casino", icon: church}, 
  // {name: "Public Hospital", icon: church}, 
  // {name: "Film &amp; RV Studio", icon: church}, 
  // {name: "Current Construction Site", icon: church}, 
  // {name: "Marina", icon: church}, 
  // {name: "Observation Tower/Wheel", icon: church}, 
  // {name: "Further Education", icon: church}, 
  // {name: "Hostel", icon: church}, 
  // {name: "Current Construction Site - Commercial", icon: church}, 
  // {name: "Cinema", icon: church}, 
  // {name: "Indoor Recreation Facility", icon: church}, 
  // {name: "Dwelling (House)", icon: church}, 
  // {name: "Industrial (Manufacturing)", icon: church}, 
  // {name: "Store Yard", icon: church}, 
  // {name: "Fire Station", icon: church}, 
  // {name: "Retail/Office/Residential/Carpark", icon: church}, 
  // {name: "Gymnasium/Health Club", icon: church}, 
  // {name: "Aquarium", icon: church}, 
  // {name: "Retail/Residential", icon: church}, 
  // {name: "Bridge", icon: church}, 
  // {name: "Department Store", icon: church}, 
  // {name: "Medical Services", icon: church}, 
   
};
  
function ChurchPin({ poi }) {

  const customPins = useMemo(
    () =>      
      <img 
        height={ 20 }
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