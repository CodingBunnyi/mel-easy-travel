import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CompressIcon from '@mui/icons-material/Compress';
import NearMeIcon from '@mui/icons-material/NearMe';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import capitalizeFirstLetter from '../../../../../utils/capitalizeFirstLetter';
import getWindSpeedDescription from '../../../../../utils/getWindSpeedDescription';
import timeConverter from '../../../../../utils/timeConverter';
import timeConverter24To12 from '../../../../../utils/timeConverter24To12';
import degToCompass from '../../../../../utils/degToCompass';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const getSunriseAndSunset = (dt) => {
    const { hour, min } = timeConverter(dt);
    const { newHour, time } = timeConverter24To12(hour);
    return `${newHour}:${min}${time}`;
  }

  return (
    <React.Fragment>
      <TableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={ () => setOpen(!open) }
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{row.date}</TableCell>
        <TableCell><img src={ `http://openweathermap.org/img/wn/${row.weatherIcon}.png` } alt={ row.weatherIcon }/></TableCell>
        <TableCell>{row.temperature}</TableCell>
        <TableCell>{row.description}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={ { paddingBottom: 0, paddingTop: 0} } colSpan={ 6 }>
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <Box sx={ { margin: 1 } }>

              <Typography sx={ { flex: 1 } }>
                <span className="description">
                  {`${capitalizeFirstLetter(row.description)}. `}
                  {`${getWindSpeedDescription(row.info.wind_speed)}.`}
                </span>
              </Typography>
              
              <span className="temp-description">The high will be {row.info.temp.max}°C, the low will be {row.info.temp.min}°C.</span>
              
              <div className="addition-info-container">
                <Typography  className="addition-info" sx={ { flex: 1 } }>
                  <span><NearMeIcon fontSize="inherit"/> {row.info.wind_speed}m/s {degToCompass(row.info.wind_deg)}</span>
                </Typography>

                <Typography  className="addition-info" sx={ { flex: 1 } }>
                  <span><CompressIcon fontSize="inherit"/> {row.info.pressure}hPa</span>
                </Typography>

                <Typography className="addition-info" sx={ { flex: 1 } }>
                  <span>Humidity: {row.info.humidity}%</span>
                </Typography>

                <Typography className="addition-info" sx={ { flex: 1 } }>
                  <span>UV: {row.info.uvi}</span>
                </Typography>

                <Typography className="addition-info" sx={ { flex: 1 } }>
                  <span>Dew point: {row.info.dew_point}°C</span>
                </Typography>
              </div>

              <Table className="temp-table" size="small" aria-label="purchases" >
                <TableHead>
                  <TableRow>
                    <TableCell style={ {borderBottom:"none"} }/>
                    <TableCell style={ {borderBottom:"none"} } align="right">Morning</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">Afternoon</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">Evening</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">Night</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell className="temp-left-cell" style={ {borderBottom:"none"} } component="th" scope="row">
                      TEMPERATURE
                    </TableCell>

                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.temp.morn}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.temp.day}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.temp.eve}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.temp.night}°C</TableCell>

                  </TableRow>

                  
                  <TableRow>
                    <TableCell className="temp-left-cell" style={ {borderBottom:"none"} } component="th" scope="row">
                      FEELS LIKE
                    </TableCell>

                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.feels_like.morn}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.feels_like.day}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.feels_like.eve}°C</TableCell>
                    <TableCell style={ {borderBottom:"none"} } align="right">{row.info.feels_like.night}°C</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table className="sunrise-sunset-table" style={ {width: "auto"} } size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="sunrise-sunset" align="left" style={ {borderBottom:"none", paddingBottom: 0} } component="th" scope="row">
                      SUNRISE
                    </TableCell>

                    <TableCell className="sunrise-sunset" align="left" style={ {borderBottom:"none", paddingBottom: 0} } component="th" scope="row">
                      SUNSET
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell style={ {borderBottom:"none", paddingTop: 0} } align="left">{getSunriseAndSunset(row.info.sunrise)}</TableCell>
                    <TableCell style={ {borderBottom:"none", paddingTop: 0} } align="left">{getSunriseAndSunset(row.info.sunset)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;