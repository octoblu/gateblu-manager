import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

import PageHeader from './header'
import PageTitle from './title'
import PageActions from './actions'

const Page = ({ children, className }) => {
  const componentClass = classNames('Page', className);
  return <div className={componentClass}>{children}</div>
};

export {Page, PageHeader, PageTitle, PageActions}
