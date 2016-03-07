import './index.css';
import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router'
import { Link } from 'react-router'
import { Card, DeviceIcon } from 'zooid-ui'
import classNames from 'classnames';

const GatebluItem = ({ device, children, className }) => {
  const componentClass = classNames(
    'GatebluItem',
    className
  );

  let {name, uuid, online, gateblu, type} = device

  function goToGateblu() {
    browserHistory.push(``)
  }

  let runningText = 'offline'
  if(gateblu && gateblu.running) runningText = 'online'
  if(!name) name = 'Gateblu'

  return <Card key={device.uuid} className={componentClass}>
    <aside><DeviceIcon type={type} className="GatebluItem-icon"></DeviceIcon></aside>
    <main className="GatebluItem-main">
      <div className="GatebluItem-body">
        <h3 className="GatebluItem-name">{name} <small className="GatebluItem-status">{runningText}</small></h3>
      </div>
      <footer className="GatebluItem-footer">
        <Link to={`/gateblu/${uuid}`} className="GatebluItem-button">Configure Gateblu</Link>
      </footer>
    </main>
  </Card>
};

GatebluItem.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object
}

export default GatebluItem
