/* global APP_VERSION */
import React from 'react';
import classnames from 'classnames';

export default class ToolBar extends React.Component {
  static propTypes = {
    onFiltersClick: React.PropTypes.func,
    onClearHistoryClick: React.PropTypes.func,
    filtersVisible: React.PropTypes.bool
  };

  handleFiltersClick(e) {
    this.props.onFiltersClick(e);
  }

  handleClearHistoryClick(e) {
    this.props.onClearHistoryClick(e);
  }

  render() {
    const {filtersVisible} = this.props;

    return (
      <nav className="toolbar">
        <div className="logo" title={`Version: ${APP_VERSION}`}>
          <span>Bunyan Logger</span>
        </div>
        <div className="divider" />
        <button className="icon-button icon-connect" title="Connect to server" disabled />
        <label className="toolbar-item">
          <span className="textbox-label">Port:</span>
          <input className="textbox" type="text" placeholder="3232" />
        </label>
        <div className="divider" />
        <button
          className="icon-button icon-clear"
          title="Clear history"
          onClick={this.handleClearHistoryClick.bind(this)}
        />
        <button
          className={classnames('icon-button', 'icon-filter', {active: filtersVisible})}
          title="Filter"
          onClick={this.handleFiltersClick.bind(this)}
        />
        <label className="toolbar-item checkbox" title="Do not remove history when connecting to bunyan server">
          <input className="checkbox-button" type="checkbox" />
          <span className="checkbox-text">Preserve history</span>
        </label>
        <div className="status not-found">
          Server not detected
        </div>
      </nav>
    );
  }
}