import React from 'react';
import timeConverter from '../../../../../utils/timeConverter';
import timeConverter24To12 from '../../../../../utils/timeConverter24To12';
import { CartesianGrid, Legend, Line, ComposedChart, Tooltip, XAxis, YAxis, Bar } from 'recharts';
import { useTheme } from '@mui/material/styles';
import './WeatherChart.scss';

const WeatherLineChart = ({ weatherData }) => {
  const theme = useTheme();

  const createData = (time, temp, rain) => {
    return {time, temp, rain}
  }

  // eslint-disable-next-line no-unused-vars
  const getData = () => {
    const data =[];
    weatherData.hourly.forEach(hourlyData => {
      let { hour } = timeConverter(hourlyData.dt);
      hour = timeConverter24To12(hour);
      const rain = hourlyData.rain ? hourlyData.rain['1h'] : 0;
      
      data.push(createData(hour, hourlyData.temp, rain));


    });
    return data;
  }


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={ theme.typography.body2 }>
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">{`Tempture: ${payload[0].value}°C`}</p>
          <p className="tooltip-value">{`Rainfall: ${payload[1].value} mm/h`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return(
    <div>
      <ComposedChart width={ 1100 } height={ 250 } data={ getData() }
        margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis 
          dataKey="time" 
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <YAxis 
          tickFormatter={ (value) => (value + '°C') }
          stroke={ theme.palette.text.secondary }
          style={ theme.typography.body2 }
        />

        <Tooltip content={ CustomTooltip } />
        <Legend />

        <Bar
          dataKey="rain"
          barSize={ 20 }
          fill="#413ea0"
        />

        <Line
          type="monotone"
          dataKey="temp"
          stroke={ theme.palette.primary.main }
          dot={ false }
        />
      </ComposedChart>
    </div>
  )
}

export default WeatherLineChart