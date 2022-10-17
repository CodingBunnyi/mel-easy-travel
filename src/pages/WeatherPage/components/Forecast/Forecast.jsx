import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import timeConverter from '../../../../utils/timeConverter';
import { Typography } from '@mui/material';
import Row from './components/Row'
import './Forecast.scss';

const Forecast = ({ weatherData }) => {
  const createData = (date, weatherIcon, temperature, description, info) => {
    return {
      date,
      weatherIcon,
      temperature,
      description,
      info,
    };
  }

  const createRows = () => {
    let rows = [];
    weatherData.daily.forEach(item => {
      const { day, date, month } = timeConverter(item.dt);
      const formatDate =  day + ', ' + date + ' ' + month;
      const weatherIcon = item.weather[0].icon;
      const temperature = `${item.temp.min} / ${item.temp.max}°C`;
      const description = item.weather[0].description;
      const obj = createData(formatDate, weatherIcon, temperature, description, item)
      rows = [...rows, obj]
    })
    return rows;
  };

  return(
    <Paper
      sx={ { 
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      } }
      className="forecast-paper"
    >
      <TableContainer sx={ { p: 2, height: 550 } }>
        <Typography variant="h6" className="title">
          8-day forecast
        </Typography>

        <Table stickyHeader aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={ { fontWeight: "bold" } }>Date</TableCell>
              <TableCell style={ { fontWeight: "bold" } }>Outlook</TableCell>
              <TableCell style={ { fontWeight: "bold" } }>Temperature</TableCell>
              <TableCell style={ { fontWeight: "bold" } }>Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {createRows().map((row) => (
              <Row key={ row.date } row={ row }/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Forecast;