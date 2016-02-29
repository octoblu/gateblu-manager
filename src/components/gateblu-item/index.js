import './index.css';
import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router'
import classNames from 'classnames';

const GatebluItem = ({ device, children, className }) => {
  const componentClass = classNames(
    'GatebluItem',
    className
  );

  const {name, uuid} = device

  function goToGateblu() {
    browserHistory.push(`/gateblu/${uuid}`)
  }

  return <div className={componentClass} onClick={goToGateblu}>
    <h3 className="GatebluItem-name">{name}</h3>
  </div>
};

GatebluItem.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object
}

export default GatebluItem
