import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

const Table = (props) => {
  let componentClass = classNames('Table', props.className);
  return <table {...props} className={componentClass} />;
};

Table.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export default Table
