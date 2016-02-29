import React, { PropTypes } from 'react'

import './index.css'

import classNames from 'classnames'

const ChannelImage = ({name, className}) => {
  const componentClass = classNames('ChannelImage', className)
  const url = `https://icons.octoblu.com/channel/${name}.svg`

  return <img src={url} className={componentClass} alt={name}/>
}

ChannelImage.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ChannelImage
