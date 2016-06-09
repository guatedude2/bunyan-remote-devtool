/* global COMPAT_MIN_VERSION COMPAT_MAX_VERSION */
import io from 'socket.io-client';
import {EventEmitter} from 'events';

import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  WAITING_FOR_AUTH,
  AUTHENTICATING,
  ERROR
} from '../actions/client';

import isVersionValid from './version-checker';

const AUTH_NONE = 0;
const AUTH_KEY = 1;
const AUTH_USER = 2;

class BunyanRemoteClient extends EventEmitter {
  connect(host, port) {
    if (this.io && this.io.connected) {
      this.io.disconnect(true);
    }
    this.io = io.connect(`http://${host}:${port}`);
    this.serverHost = host;
    this.serverPort = port;
    this.enabled = true;

    this.io.on('connect', () => {
      this.detected = true;
      this.connected = false;
      this.emit('status-changed', CONNECTING);
    });

    this.io.on('info', ({hostname, version, auth}) => {
      this.io.serverName = hostname;
      this.io.authType = auth;
      if (!isVersionValid(version, COMPAT_MIN_VERSION, COMPAT_MAX_VERSION)) {
        this.emit('status-changed', ERROR, `Incompatible server version ${version}`);
      } else if (auth === AUTH_NONE) {
        this.io.emit('auth');
      } else if (auth === AUTH_USER || auth === AUTH_KEY){
        this.emit('status-changed', WAITING_FOR_AUTH);
        this.emit('request-auth', auth);
      }
    });

    this.io.on('auth', ({status, history, error}) => {
      if (status === 'ok') {
        this.connected = true;
        this.emit('status-changed', CONNECTED, history);
        this.emit('log-event', `Connected to ${this.io.serverName}`);
      } else {
        this.detected = false;
        this.emit('status-changed', ERROR);
        this.emit('auth-error', error);
        this.connect(this.serverHost, this.serverPort);
      }
    });

    this.io.on('log', (data) => {
      this.emit('log-event', data);
    });

    this.io.on('disconnect', () => {
      if (this.connected) {
        this.emit('log-event', 'Disconnected from server');
        this.connected = false;
      }
      this.emit('status-changed', DISCONNECTED);
    });
  }

  enable() {
    this.enabled = true;
    this.connect(this.serverHost, this.serverPort);
  }

  disable() {
    this.enabled = false;
    this.io.disconnect();
  }

  authenticate(userKey, password) {
    if (!this.io || !this.io.connected) {
      return false;
    } else if (this.io.authType === AUTH_USER) {
      this.io.emit('auth', {
        user: userKey,
        password: password
      });
    } else {
      this.io.emit('auth', userKey);
    }
    this.emit('status-changed', AUTHENTICATING);
    return true;
  }

  setPort(port) {
    clearTimeout(this._portDebouncer);
    this._portDebouncer = setTimeout(() => {
      if (port !== this.serverPort) {
        this.connect(this.serverHost, port);
      }
    }, 800);
  }

  onStatusChanged(cb) { this.on('status-changed', cb); }
  onLogEvent(cb) { this.on('log-event', cb); }
  onRequestAuth(cb) { this.on('request-auth', cb); }
  onAuthError(cb) { this.on('auth-error', cb); }
};

export default new BunyanRemoteClient();