/* global COMPAT_MIN_VERSION COMPAT_MAX_VERSION */
import io from 'socket.io-client';
import {EventEmitter} from 'events';

import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
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

    this.io.on('connect', () => {
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
        this.emit('status-changed', AUTHENTICATING, auth);
      }
    });

    this.io.on('auth', ({status, history, error}) => {
      if (status === 'ok') {
        this.emit('status-changed', CONNECTED, history);
      } else {
        this.emit('status-changed', ERROR, error);
      }
    });

    this.io.on('log', (data) => {
      this.emit('log-event', data);
    });

    this.io.on('disconnect', () => {
      this.emit('status-changed', DISCONNECTED);
    });
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
};

export default new BunyanRemoteClient();