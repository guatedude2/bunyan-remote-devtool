import React from 'react';
import Record from './Record';

export default class HistoryPane extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    history: React.PropTypes.array,
    onTagClick: React.PropTypes.func
  };

  //TODO: scroll to latest
  //TODO: hide/show old history when scrolling

  render() {
    const {history, onTagClick} = this.props;
    return (
      <article className="history-pane">
        {history.map((record, index) => (
          <Record
            key={index}
            format="[%time:lll%] %level%: %name%/%pid% on %hostname%: %msg%"
            record={record}
            onTagClick={onTagClick}
          />
        ))}
      </article>
    );
  }
}