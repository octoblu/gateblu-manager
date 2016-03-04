import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'
import {Button} from 'zooid-ui'
import classNames from 'classnames';

const ConfigureDevice = ({ device, onChange, children, className }) => {
  const componentClass = classNames(
    'ConfigureDevice',
    className
  );

  return <div className={componentClass}>
    <MeshbluDeviceEditor device={device} onChange={onChange}></MeshbluDeviceEditor>
  </div>
};

ConfigureDevice.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ConfigureDevice
