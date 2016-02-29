import './index.css';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Gateblu = ({ device, children, className }) => {
  const componentClass = classNames(
    'Gateblu',
    className
  );

  const {name} = device

  console.log('device', device)
  return <div className={componentClass}>
    <h3 className="Gateblu-name">{name}</h3>
  </div>
};

Gateblu.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object
}

export default Gateblu
