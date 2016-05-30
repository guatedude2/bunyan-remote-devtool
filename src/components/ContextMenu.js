import React from 'react';
import classnames from 'classnames';

import Panel from './Panel';

export default class ContextMenu extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    visible: React.PropTypes.bool,
    className: React.PropTypes.string
  };

  render() {
    const {className} = this.props;
    var items = [
      'Menu Item 1',
      null,
      'Menu Item 2',
      'Menu Item 3',
      'Menu Item 4',
      null,
      'Menu Item 5',
    ];
    return (
      <Panel {...this.props} className={classnames('context-menu', className)}>
        <ul className="menu-list">
        {items.map((item, index) => (
          <li key={index} className={classnames({item: item, separator: !item})}>{item}</li>
        ))}
        </ul>
      </Panel>
    );
  }
}