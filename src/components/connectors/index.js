import './index.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import {Icon, Button, Card, OctobluIcon} from 'zooid-ui'
import classNames from 'classnames';

const Connectors = ({ connectors, children, className }) => {
  const componentClass = classNames(
    'Connectors',
    className
  );

  let items = _.map(connectors, (connector) => {
    const {name, uuid, type} = connector
    const pathToInstallation = `/gateblu/${uuid}`

    return <Card className="Connector">
      <aside><OctobluIcon type={type} className="Connector-icon"></OctobluIcon></aside>
      <main className="Connector-main">
        <div className="Connector-body">
          <h3 className="Connector-name">{name}</h3>
        </div>
        <footer className="Connector-footer">
          <Button kind="primary" href={pathToInstallation} className="Connector-button"><Icon name="MdAdd"/></Button>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

Connectors.propTypes = {
  className: PropTypes.string,
  connectors: PropTypes.array.isRequired
}

export default Connectors
