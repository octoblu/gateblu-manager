import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

const PageHeader = ({ children, className }) => {
  const componentClass = classNames('Page-header', className);
  return <div className={componentClass}>{children}</div>
};

export default PageHeader
