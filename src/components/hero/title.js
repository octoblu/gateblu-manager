import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

const HeroTitle = ({ children, className }) => {
  const componentClass = classNames(
    'Hero-title',
    className
  )

  return <h2 className={componentClass}>{children}</h2>
};

export default HeroTitle
