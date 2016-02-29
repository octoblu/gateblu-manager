import './index.css';
import React, { PropTypes } from 'react';

const ErrorMsg = ({ errorMessage }) => {
  return (
    <div className="ErrorMsg u-textCenter">
      <img className="TheSaddestOctopus" src="https://s3-us-west-2.amazonaws.com/octoblu-cdn/sad/octopus.svg" />
      <h1 className="ErrorMsg-message">Well, this is awkward...</h1>
      <h2>We got an error:</h2>
      <h3 className="ErrorMsg-message">{errorMessage}</h3>
    </div>
  )
};

ErrorMsg.propTypes = {
  errorMessage: PropTypes.string.isRequired
}

export default ErrorMsg
