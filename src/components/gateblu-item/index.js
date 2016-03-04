import './index.css';
import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router'
import {Button, Card, OctobluIcon} from 'zooid-ui'
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

  let pathToGateblu = `/gateblu/${uuid}`

  let runningText = 'offline'
  if(gateblu && gateblu.running) runningText = 'online'
  if(!name) name = 'Gateblu'

  return <Card className={componentClass}>
    <aside><OctobluIcon type={type} className="GatebluItem-icon"></OctobluIcon></aside>
    <main className="GatebluItem-main">
      <div className="GatebluItem-body">
        <h3 className="GatebluItem-name">{name} <small className="GatebluItem-status">{runningText}</small></h3>
      </div>
      <footer className="GatebluItem-footer">
        <a href={pathToGateblu} className="GatebluItem-button">Configure Gateblu</a>
      </footer>
    </main>
  </Card>
};

GatebluItem.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object
}

export default GatebluItem
