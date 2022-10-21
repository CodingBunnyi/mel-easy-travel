import * as React from 'react';
import restaurant from '../../../../../assets/images/restaurant.svg';

function Pin() {
  return (
    <img 
      height={ 25 }
      style={ { 'cursor': 'pointer'} }
      src={ restaurant }
      />
  );
}

export default React.memo(Pin);