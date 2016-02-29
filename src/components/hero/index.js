import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

import HeroTitle from './title'
import HeroSubTitle from './sub-title'

const Hero = ({ children, className }) => {
  const componentClass = classNames('Hero', className);
  return <header className={componentClass}>{children}</header>
};

export {Hero, HeroTitle, HeroSubTitle}
