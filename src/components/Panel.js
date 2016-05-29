import React from 'react';
import classnames from 'classnames';

export default class Panel extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    visible: React.PropTypes.bool,
    className: React.PropTypes.string
  };

  render() {
    return (
      <div {...this.props}
        className={classnames('panel', this.props.className, {shown: this.props.visible})}>
        {this.props.children}
      </div>
    );
  }
}