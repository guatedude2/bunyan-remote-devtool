import React from 'react';
import Panel from './Panel';

export default class AuthPanel extends React.Component {
  static propTypes = {
    children: React.PropTypes.array,
    type: React.PropTypes.string
  };

  render() {
    return (
      <Panel {...this.props} className="auth-panel">
        { this.props.type === 'key' ?
          <div className="group">
            <div className="instrutions">Please enter the server key:</div>
            <div className="field">
              <input className="textbox" type="text" placeholder="Server Key" />
            </div>
          </div>
          :
          <div className="group">
            <div className="instrutions">Please enter your username and password</div>
            <div className="field">
              <input className="textbox" type="text" placeholder="Username" />
            </div>
            <div className="field">
              <input className="textbox" type="password" placeholder="Password" />
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