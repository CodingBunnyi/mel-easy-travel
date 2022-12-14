import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { mainListItem, secondaryListItem } from '../ListItemTable/ListItemTable';

const ListItems = (props) => {
  const { page, setPage } = props;
  const handleClick = (event) => {
    setPage(event.currentTarget.getAttribute('name'));
  };

  return (
    <List component="nav">
      {mainListItem.map((item) => (
        <ListItemButton selected={ page === item.name } name={ item.name } onClick={ handleClick } key={ item.name } component={ Link } to={ "/" + item.link }>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>

          <ListItemText primary={ item.name } />
        </ListItemButton>
        ))}

      <Divider sx={ { my: 1 } } />

      <ListSubheader component="div" inset>
        About Us
      </ListSubheader>

      {secondaryListItem.map((item) => (
        <ListItemButton selected={ page === item.name } name={ item.name } onClick={ handleClick } key={ item.name } component={ Link } to={ "/" + item.link }>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>

          <ListItemText primary={ item.name } />
        </ListItemButton>
        ))}
    </List>
  )
}

export default ListItems;
