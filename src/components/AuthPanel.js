import React from 'react';
import Panel from './Panel';

export default class AuthPanel extends React.Component {
  static propTypes = {
    children: React.PropTypes.array,
    type: React.PropTypes.string
  };

  render() {
    return (
      <Panel className="auth-panel" visible={true}>
        { this.props.type === AuthPanel.TYPE_KEY ?
          <div className="group">
            <div className="instrutions">Please enter the server key:</div>
            <div class="field">
              <input type="text" placeholder="Server Key" />
            </div>
          </div>
          :
          <div className="group">
            <div className="instrutions">Please enter your username and password</div>
            <div class="field">
              <input type="text" placeholder="Username" />
            </div>
            <div class="field">
              <input type="password" placeholder="Password" />
            </div>
          </div>
        }
        <div className="buttons">
          <button className="validate">Validate</button>
          <button className="cancel">Cancel</button>
        </div>
      </Panel>
    );
  }
}

AuthPanel.TYPE_KEY = 'TYPE_KEY';
AuthPanel.TYPE_USER = 'TYPE_USER';