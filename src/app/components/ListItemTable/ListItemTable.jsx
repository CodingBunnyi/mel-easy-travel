import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItem = [
  {name: "Dashboard", link: "dashboard", icon: <DashboardIcon />}, 
  {name: "Weather", link: "weather", icon: <WbSunnyIcon />}, 
  {name: "Map", link: "map", icon: <MapIcon />}, 
];

export const secondaryListItem = [
  {name: "About MelEasyTravel", link: "about-mel-easy-travel", icon: <AssignmentIcon />}, 
  {name: "Data and Reference", link: "data-source", icon: <AssignmentIcon />}, 
]

export const listItem = [...mainListItem, ...secondaryListItem]