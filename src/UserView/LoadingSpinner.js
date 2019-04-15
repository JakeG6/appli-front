import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const spinnerStyle = {
    color: 'rgb(54, 193, 54)',
    margin: '0 auto'
}

const spinnerContainer = {
    height: '79vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

}

function LoadingSpinner() {
  return (
    <div style={spinnerContainer}>
      <CircularProgress style={spinnerStyle} size={100} />
    </div>
  );
}

export default LoadingSpinner;