import './index.css';
import React, { PropTypes } from 'react';
import { Button, Icon } from 'zooid-ui'
import classNames from 'classnames';

const renderButtons = (buttons) => {
  if (buttons) return buttons
  return null
}

const DeviceActions = ({ buttons, device, onStart, onStop, onDelete, children, className }) => {
  const componentClass = classNames(
    'DeviceActions',
    className
  );

  let playButtonType = 'hollow-approve'
  let stopButtonType = 'hollow-neutral'
  if(device.gateblu) {
    if(device.gateblu.running){
      playButtonType = 'approve'
    }else{
      stopButtonType = 'neutral'
    }
  }

  return <div className={componentClass}>
    <Button className="DeviceActions--action" kind={stopButtonType} onClick={onStop}><Icon name="MdStop"/></Button>
    <Button className="DeviceActions--action" kind={playButtonType} onClick={onStart}><Icon name="MdPlayArrow"/></Button>
    <Button className="DeviceActions--action" kind="hollow-danger" onClick={onDelete}><Icon name="MdDelete"/></Button>
    {renderButtons(buttons)}
  </div>
};

DeviceActions.propTypes = {
  buttons: PropTypes.node,
  className: PropTypes.string,
  device: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
}

export default DeviceActions
