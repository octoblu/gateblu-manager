import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './index.css';

const TableRow = (props) => {
  let componentClass = classNames('Table-row', props.className);
  return <tr {...props} className={componentClass} />;
};

TableRow.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export default TableRow
