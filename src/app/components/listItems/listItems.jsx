import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MapIcon from '@mui/icons-material/Map';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

const mainListItem = [
  {name: "Dashboard", link: "dashboard", icon: <DashboardIcon />}, 
  {name: "Weather", link: "weather", icon: <WbSunnyIcon />}, 
  {name: "Map", link: "map", icon: <MapIcon />}, 
  {name: "Tourist attraction", link: "tourist-attraction", icon: <AttractionsIcon />},
  {name: "Accommodation", link: "accommodation", icon: <ApartmentIcon />}
];

const secondaryListItem = [
  {name: "About MelEasyTravel", link: "about-mel-easy-travel", icon: <AssignmentIcon />}, 
  {name: "Data", link: "data", icon: <AssignmentIcon />}, 
  {name: "Reference", link: "reference", icon: <AssignmentIcon />}
]

const listItems = (props) => {
  const { page, setPage } = props;
  const handleClick = (event) => {
    setPage(event.currentTarget.getAttribute('name'));
  };

  return (
    <List component="nav">
    {mainListItem.map((item) => (
          <ListItemButton selected={page === item.name} name={item.name} onClick={handleClick} key={item.name} component={Link} to={"/" + item.link}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div" inset>
      About Us
    </ListSubheader>
    {secondaryListItem.map((item) => (
          <ListItemButton selected={page === item.name} name={item.name} onClick={handleClick} key={item.name} component={Link} to={"/" + item.link}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
  </List>
  )
}

export default listItems;