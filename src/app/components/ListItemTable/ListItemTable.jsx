import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MapIcon from '@mui/icons-material/Map';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItem = [
  {name: "Dashboard", link: "dashboard", icon: <DashboardIcon />}, 
  {name: "Weather", link: "weather", icon: <WbSunnyIcon />}, 
  {name: "Map", link: "map", icon: <MapIcon />}, 
  {name: "Tourist attraction", link: "tourist-attraction", icon: <AttractionsIcon />},
  {name: "Accommodation", link: "accommodation", icon: <ApartmentIcon />}
];

export const secondaryListItem = [
  {name: "About MelEasyTravel", link: "about-mel-easy-travel", icon: <AssignmentIcon />}, 
  {name: "Data", link: "data", icon: <AssignmentIcon />}, 
  {name: "Reference", link: "reference", icon: <AssignmentIcon />}
]

export const listItem = [...mainListItem, ...secondaryListItem]