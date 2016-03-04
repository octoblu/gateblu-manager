import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import GatebluItem from '../gateblu-item'
import classNames from 'classnames';

const GatebluItem = ({ devices, children, className }) => {
  const componentClass = classNames(
    'Gateblus',
    className
  );

  let gatebluItems = _.map(devices, (device) => {
    return <GatebluItem device={device}></Device>
  })

  return <div className={componentClass}>
    {gatebluItems}
  </div>
};

GatebluItem.propTypes = {
  className: PropTypes.string,
  devices: PropTypes.array.isRequired
}

export default GatebluItem
