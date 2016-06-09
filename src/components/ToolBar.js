/* global APP_VERSION */
import React from 'react';
import classnames from 'classnames';

import Textbox from './Textbox';

import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  WAITING_FOR_AUTH,
  AUTHENTICATING,
  ERROR
} from '../actions/client';

const DISABLED = 'DISABLED';

export default class ToolBar extends React.Component {
  static propTypes = {
    clientEnabled: React.PropTypes.bool,
    serverPort: React.PropTypes.string,
    clientStatus: React.PropTypes.string,
    filtersVisible: React.PropTypes.bool,
    preserveHistory: React.PropTypes.bool,
    onPortChange: React.PropTypes.func,
    onStatusClick: React.PropTypes.func,
    onEnableDisableClick: React.PropTypes.func,
    onFiltersClick: React.PropTypes.func,
    onClearHistoryClick: React.PropTypes.func,
    onPreserveHistoryClick: React.PropTypes.func
  };

  static defaultProps = {
    onPortChange: e => e,
    onStatusClick: e => e,
    onFiltersClick: e => e,
    onEnableDisableClick: e => e,
    onClearHistoryClick: e => e,
    onPreserveHistoryClick: e => e
  };

  statusInfo(status) {
    switch (status) {
      case CONNECTING:
        return { text: 'Connecting...', class: 'connecting' };
      case CONNECTED:
        return { text: 'Connected', class: 'connected' };
      case DISCONNECTED:
        return { text: 'Server not found', class: 'not-found' };
      case WAITING_FOR_AUTH:
        return { text: 'Waiting for Authenticating...', class: 'authenticating' };
      case AUTHENTICATING:
        return { text: 'Authenticating...', class: 'connecting' };
      case ERROR:
        return { text: 'Error', class: 'error' };
      case DISABLED:
        return { text: 'Not recording', class: 'not-found' };
    }

    return { text: 'Unknown Status', class: 'error' };
  }

  render() {
    const {
      serverPort,
      filtersVisible,
      clientStatus,
      clientEnabled,
      preserveHistory
    } = this.props;

    const statusInfo = this.statusInfo(clientEnabled ? clientStatus : DISABLED);

    return (
      <nav className="toolbar">
        <div className="logo" title={`Version: ${APP_VERSION}`}>
          <span>Bunyan Logger</span>
        </div>

        <div className="divider" />

        <button
          className={classnames('icon-button', 'icon-record', {active: clientEnabled})}
          title={clientEnabled ? 'Stop recording ⌘ E' : 'Start recording bunyan logs ⌘ E'}
          onClick={()=> {
            this.props.onEnableDisableClick();
          }}
        />
        <button
          className="icon-button icon-clear"
          title={'Clear history ⌘ K'}
          onClick={this.props.onClearHistoryClick.bind(this)}
        />

        <div className="divider" />

        <label className="toolbar-item">
          <span className="textbox-label">Port:</span>
          <Textbox
            placeholder="3232"
            pattern="([1-9][0-9]{0,5})?"
            value={serverPort}
            onChange={(e) => { this.props.onPortChange(e.target.value); }} />
        </label>

        <div className="divider" />

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
            onClick={() => { this.props.onPreserveHistoryClick(!preserveHistory); }}
          />
          <span className="checkbox-text">Preserve history</span>
        </label>

        <div
          className={classnames('status' , statusInfo.class)}
          onClick={() => {
            if (clientStatus === WAITING_FOR_AUTH) {
              this.props.onStatusClick();
            }
          }}
        >
          <span className="status-text">{statusInfo.text}</span>
        </div>
      </nav>
    );
  }
}