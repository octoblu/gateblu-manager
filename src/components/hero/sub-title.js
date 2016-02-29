import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

const HeroSubTitle = ({ children, className }) => {
  const componentClass = classNames(
    'Hero-subTitle',
    'font-light',
    className
  )

  return <h2 className={componentClass}>{children}</h2>
};

export default HeroSubTitle
