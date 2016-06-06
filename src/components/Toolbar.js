/* global APP_VERSION */
import React from 'react';
import classnames from 'classnames';

import Textbox from './Textbox';

import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  AUTHENTICATING,
  ERROR
} from '../actions/client';

export default class ToolBar extends React.Component {
  static propTypes = {
    clientStatus: React.PropTypes.string,
    filtersVisible: React.PropTypes.bool,
    preserveHistory: React.PropTypes.bool,
    onFiltersClick: React.PropTypes.func,
    onClearHistoryClick: React.PropTypes.func,
    onPreserveHistoryClick: React.PropTypes.func
  };

  static defaultProps = {
    onFiltersClick: e => e,
    onClearHistoryClick: e => e,
    onPreserveHistoryClick: e => e
  };

  statusToText(status) {
    switch (status) {
      case CONNECTING:
        return 'Connecting...';
      case CONNECTED:
        return 'Connected';
      case DISCONNECTED:
        return 'Server not found';
      case AUTHENTICATING:
        return 'Authenticating...';
      case ERROR:
        return 'Error';
    }
  }

  render() {
    const {filtersVisible, clientStatus, preserveHistory} = this.props;

    const statusText = this.statusToText(clientStatus);
    // const isError = clientStatus === ERROR;
    // const isConnected = clientStatus === CONNECTED;

    return (
      <nav className="toolbar">
        <div className="logo" title={`Version: ${APP_VERSION}`}>
          <span>Bunyan Logger</span>
        </div>
        <div className="divider" />
        <label className="toolbar-item">
          <span className="textbox-label">Port:</span>
          <Textbox placeholder="3232" pattern="\d{0,5}" />
        </label>
        <div className="divider" />
        <button
          className="icon-button icon-clear"
          title="Clear history"
          onClick={this.props.onClearHistoryClick.bind(this)}
        />
        <button
          className={classnames('icon-button', 'icon-filter', {active: filtersVisible})}
          title="Filter"
          onClick={this.props.onFiltersClick.bind(this)}
        />
        <label className="toolbar-item checkbox" title="Do not remove history when connecting to bunyan server">
          <input
            type="checkbox"
            className="checkbox-button"
            checked={preserveHistory}
            onClick={this.props.onPreserveHistoryClick.bind(this)}
          />
          <span className="checkbox-text">Preserve history</span>
        </label>
        <div className="status not-found">
          {statusText}
        </div>
      </nav>
    );
  }
}