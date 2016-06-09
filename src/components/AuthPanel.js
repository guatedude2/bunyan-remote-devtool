import React from 'react';
import Panel from './Panel';
import Textbox from './Textbox';

import { AUTH_KEY } from '../actions/client';

export default class AuthPanel extends React.Component {
  static propTypes = {
    serverKey: React.PropTypes.string,
    error: React.PropTypes.string,
    username: React.PropTypes.string,
    type: React.PropTypes.number,
    onValidate: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  };

  static defaultProps = {
    onValidate: e => e,
    onCancel: e => e
  };


  constructor(props) {
    super(props);
    this.state = {
      serverKey: props.serverKey,
      username: props.username,
      password: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      serverKey: props.serverKey,
      username: props.username,
      password: ''
    });
  }

  render() {
    const { type, error } = this.props;
    const { serverKey, username, password } = this.state;

    const isValidateDisabled = (!serverKey && !username);

    const validate = () => {
      if (isValidateDisabled) return;
      this.props.onValidate(type === AUTH_KEY ? serverKey : username, password);
    };

    return (
      <Panel
        {...this.props}
        className="auth-panel"
        onDismiss={() => {
          this.props.onCancel();
        }}
      >
        { type === AUTH_KEY ?
          <div className="group">
            <div className="instrutions">Please enter the server key:</div>
            <div className="field">
              <Textbox
                value={serverKey}
                placeholder="Server Key"
                autofocus
                onEnterPress={validate.bind(this)}
                onChange={(e) => {
                  this.setState({ serverKey: e.target.value });
                }}
              />
            </div>
          </div>
          :
          <div className="group">
            <div className="instrutions">Please enter your username and password</div>
            <div className="field">
              <Textbox
                value={username}
                placeholder="Username"
                autofocus
                onEnterPress={validate.bind(this)}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="field">
              <Textbox
                value={password}
                password={true}
                placeholder="Password"
                onEnterPress={validate.bind(this)}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </div>
          </div>
        }
        { error ? <div className="error">Error: {error}</div> : null}
        <div className="buttons">
          <button
            className="validate"
            disabled={isValidateDisabled}
            onClick={validate.bind(this)}
          >
            Validate
          </button>
          <button
            className="cancel"
            onClick={() => { this.props.onCancel(); }}
          >
            Cancel
          </button>
        </div>
      </Panel>
    );
  }
}