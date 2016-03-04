import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import {Button, Card, OctobluIcon} from 'zooid-ui'
import classNames from 'classnames';

const InstalledDevices = ({ devices, children, className }) => {
  const componentClass = classNames(
    'InstalledDevices',
    className
  );

  let items = _.map(devices, (device) => {
    const {name, uuid, type} = device
    const pathToDevice = `/devices/${uuid}`
    let runningText = 'offline'
    if(device && device.running) runningText = 'online'

    return <Card className="InstalledDevice">
      <aside><OctobluIcon type={type} className="InstalledDevice-icon"></OctobluIcon></aside>
      <main className="InstalledDevice-main">
        <div className="InstalledDevice-body">
          <h3 className="InstalledDevice-name">{name} <small className="InstalledDevice-status">{runningText}</small></h3>
        </div>
        <footer className="InstalledDevice-footer">
          <a href={pathToDevice} className="InstalledDevice-button">Configure Gateblu</a>
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
