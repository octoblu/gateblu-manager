import './index.css';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../spinner'

const LOADING_SIZES = ['regular', 'large', 'small'];
const LOADING_KINDS = [ 'spinning' ]

const Loading = ({ size, kind, message, children, className }) => {
  const componentClass = classNames(
    'Loading',
    `Loading--${kind}`,
    `Loading--${size}`,
    className
  );

  return <div className={componentClass}>
    <Spinner />
    <h3 className="Loading-message">{message}</h3>
  </div>
};

Loading.propTypes = {
  size: PropTypes.oneOf(LOADING_SIZES),
  kind: PropTypes.oneOf(LOADING_KINDS),
  className: PropTypes.string,
  message: PropTypes.string
}

Loading.defaultProps = {
  size: LOADING_SIZES[0],
  kind: LOADING_KINDS[0]
};

export default Loading
