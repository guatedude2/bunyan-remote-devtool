import React from 'react';
import classnames from 'classnames';

export default class Panel extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    visible: React.PropTypes.bool,
    className: React.PropTypes.string,
    onDismiss: React.PropTypes.func
  };

  static defaultProps = {
    onDismiss: e => e
  };

  render() {
    const {className, children, visible} = this.props;
    return (
      <div className={classnames('panel-container', {shown: visible})}>
        <div {...this.props}
          className={classnames('panel', className)}>
          {children}
        </div>
        <div
          className="overlay"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onDismiss();
          }}
        />
      </div>
    );
  }
}