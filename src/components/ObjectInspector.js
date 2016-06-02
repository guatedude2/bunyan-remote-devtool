import React from 'react';
import JSONTree from 'react-json-tree';

export default class ObjectInspector extends React.Component {
  static propTypes = {
    inspect: React.PropTypes.any,
  };

  render() {
    const {inspect} = this.props;
    return (
      <JSONTree data={inspect} />
    );
  }
}