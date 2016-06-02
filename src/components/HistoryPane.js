import _ from 'lodash';
import React from 'react';
import bunyanFormatter from '../utils/bunyan-formatter';
import ObjectInspector from './ObjectInspector';

export default class HistoryPane extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    history: React.PropTypes.array
  };

  formatRecord(format, record) {
    const {log, object, error, tags} = bunyanFormatter(format, record);
    let inspectObject;

    if (error) {
      inspectObject = <pre className="error">{error}</pre>;
    } else if (object) {
      inspectObject = <ObjectInspector inspect={object} />;
    }

    return <div className="record">
      <div dangerouslySetInnerHTML={{__html: log }} />
      {inspectObject}
      <div className="tags">
        {tags ? _.map(tags, (value, key) => (
          <span key={key}>{key}: {value}</span>
        )) : null}
      </div>
    </div>;
  }

  render() {
    const {history} = this.props;
    return (
      <article className="history-pane">
        {history.map((record) => (
          <div>{this.formatRecord('[%time%] %level%: %name%/%pid% on %hostname%: %msg%', record)}</div>
        ))}
      </article>
    );
  }
}