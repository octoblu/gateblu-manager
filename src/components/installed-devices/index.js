import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import {Card, DeviceIcon} from 'zooid-ui'
import classNames from 'classnames';

const InstalledDevices = ({ devices, children, className }) => {
  const componentClass = classNames(
    'InstalledDevices',
    className
  );

  let items = _.map(devices, (device) => {
    const {name, uuid, type} = device
    let runningText = 'offline'
    if(device && device.running) runningText = 'online'

    return <Card key={device.uuid} className="InstalledDevice">
      <aside><DeviceIcon type={type} className="InstalledDevice-icon"></DeviceIcon></aside>
      <main className="InstalledDevice-main">
        <div className="InstalledDevice-body">
          <h3 className="InstalledDevice-name">{name} <small className="InstalledDevice-status">{runningText}</small></h3>
        </div>
        <footer className="InstalledDevice-footer">
          <Link to={`/devices/${uuid}`} className="InstalledDevice-button">Configure Device</Link>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

InstalledDevices.propTypes = {
  className: PropTypes.string,
  devices: PropTypes.array.isRequired
}

export default InstalledDevices
