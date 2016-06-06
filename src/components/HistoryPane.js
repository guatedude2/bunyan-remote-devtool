import React from 'react';
import Record from './Record';

export default class HistoryPane extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    history: React.PropTypes.array,
    filteredCount: React.PropTypes.number,
    onTagClick: React.PropTypes.func,
    onClearFiltersClick: React.PropTypes.func,
  };

  static defaultProps = {
    onClearFiltersClick: e => e
  };

  render() {
    const {filteredCount, history, onTagClick} = this.props;
    return (
      <article className="history-pane">
        {filteredCount > 0 ?
          <div className="clear-filters">
            <span>{filteredCount} messages are hidden by filters.</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                this.props.onClearFiltersClick(e);
              }}>
              Show all messages.
            </a>
          </div>
        : null}
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