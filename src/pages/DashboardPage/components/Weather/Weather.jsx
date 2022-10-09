import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

// eslint-disable-next-line no-unused-vars
export default function Weather({weatherData}) {
  
  return (
    <React.Fragment>
      <p>Temp: {weatherData.main.temp}</p>

      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>

      <Typography color="text.secondary" sx={ { flex: 1 } }>
        on 15 March, 2019
      </Typography>

      <div>
        <Link color="primary" href="#" onClick={ preventDefault }>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}