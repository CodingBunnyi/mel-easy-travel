import React from 'react';
import timeConverter from '../../../../utils/timeConverter';
import timeConverter24To12 from '../../../../utils/timeConverter24To12';
import { CartesianGrid, Legend, Line, ComposedChart, Tooltip, XAxis, YAxis, Bar, Area } from 'recharts';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import './WeatherChart.scss';
import LoadingBox from '../../../../app/components/LoadingBox/LoadingBox';

const WeatherChart = ({ weatherData, weatherLoading }) => {
  const theme = useTheme();

  const createData = (time, temp, rain, windSpeed) => {
    return {time, temp, rain, windSpeed}
  }

  const getData = () => {
    const data =[];
    weatherData.hourly.forEach(hourlyData => {
      let { hour } = timeConverter(hourlyData.dt);
      const { newHour , time } = timeConverter24To12(hour);
      const rain = hourlyData.rain ? hourlyData.rain['1h'] : 0;
      
      data.push(createData(newHour + time, hourlyData.temp, rain, hourlyData.wind_speed));


    });
    return data;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={ theme.typography.body2 }>
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">{`Tempture: ${payload[2].value}°C`}</p>
          <p className="tooltip-value">{`Rainfall: ${payload[1].value} mm/h`}</p>
          <p className="tooltip-value">{`Wind Speed: ${payload[0].value} m/s`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return(
    <Paper
      sx={ {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      } }
      className="weather-chart-paper"
    >
      <Typography variant="h6" className="title">
        Hourly forecast
      </Typography>

      {weatherLoading ? <LoadingBox /> : 
      <ComposedChart width={ 1100 } height={ 250 } data={ getData() }
        margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis 
          dataKey="time" 
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <YAxis 
          yAxisId={ 1 } 
          orientation="right"
          tickFormatter={ (value) => (value + ' mm/h') }
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <YAxis
          yAxisId={ 2 }
          tickFormatter={ (value) => (value + '°C') }
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <YAxis 
          yAxisId={ 3 } 
          tickFormatter={ (value) => (value + ' m/s') }
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <Tooltip content={ CustomTooltip } />
        <Legend />

        <Area 
          yAxisId={ 3 }
          type="monotone"
          dataKey="windSpeed"
          fill="#8884d8"
          stroke="#8884d8"
        />

        <Bar
          yAxisId={ 1 }
          dataKey="rain"
          barSize={ 20 }
          fill="#413ea0"
        />

        <Line
          yAxisId={ 2 }
          type="monotone"
          dataKey="temp"
          stroke={ theme.palette.primary.main }
          dot={ false }
        />
      </ComposedChart>}
    </Paper>
  )
}

export default WeatherChart