import React from 'react'
import { BarChart, Tooltip, XAxis, YAxis, Bar} from 'recharts';
// import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LoadingBox from '../../../../../app/components/LoadingBox/LoadingBox';
const DailyBarChart = ({ loading, twitterDailyData }) => {
  // const theme = useTheme();
  return (
    <>
      {loading.twitterDailyData ? <LoadingBox />:
      <>
        <Typography component="p" color="text.secondary">The bar char shows the number of tweets posted in the last week. </Typography>

        <div style={ { paddingTop: '30px'} }>
          <BarChart width={ 550 } height={ 300 } data={ twitterDailyData } barSize={ 30 }>
            <XAxis dataKey="date" height={ 100 } interval={ 0 } />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tweet_count" fill="#8884d8" label={ { position: 'top' } }/>
          </BarChart>
        </div>
      </> }
    </>
  )
}
export default DailyBarChart;