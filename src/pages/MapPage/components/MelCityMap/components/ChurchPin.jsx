import * as React from 'react';
import ChurchTwoToneIcon from '@mui/icons-material/ChurchTwoTone';

const pinStyle = {
    cursor: 'pointer',
    fill: '#3366CC',
    stroke: 'none'
};
  
function ChurchPin({size = 20}) {
    return (
      <svg height={ size } viewBox="0 0 24 24" style={ pinStyle }>
        <ChurchTwoToneIcon />
      </svg>
    );
}
  
export default React.memo(ChurchPin);