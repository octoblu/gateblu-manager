import './index.css';
import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router'
import {Button} from 'zooid-ui'
import classNames from 'classnames';

const GatebluItem = ({ device, children, className }) => {
  const componentClass = classNames(
    'GatebluItem',
    className
  );

  let {name, uuid, online, gateblu} = device

  function goToGateblu() {
    browserHistory.push(`/gateblu/${uuid}`)
  }

  let onlineText = 'offline'
  if(online) onlineText = 'online'
  let runningText = 'stopped'
  if(gateblu && gateblu.running) runningText = 'running'
  if(!name) name = 'Gateblu'

  return <div className={componentClass} >
    <h3 className="GatebluItem-name">{name} <small>[{onlineText} and {runningText}]</small> <Button onClick={goToGateblu}>Configure Gateblu</Button></h3>
  </div>
};

GatebluItem.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object
}

export default GatebluItem
