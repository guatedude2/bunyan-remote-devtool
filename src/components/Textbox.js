import React from 'react';

export default class Textbox extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    pattern: React.PropTypes.string,
    password: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    onChange: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onEnterPress: React.PropTypes.func,
  };

  static defaultProps = {
    password: false,
    onChange: e => e,
    onKeyPress: e => e,
    onEnterPress: e => e,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value !== undefined ? props.value : '',
      patternRegExp: props.pattern !== undefined ? new RegExp(`^${props.pattern}$`) : new RegExp('^.*$')
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value !== undefined ? props.value : this.state.value,
      patternRegExp: props.pattern !== undefined ? new RegExp(`^${props.pattern}$`) : this.state.patternRegExp
    });
  }

  render() {
    const {value} = this.state;
    const {password, className} = this.props;

    return (
      <input
        {...this.props}
        type={password !== true ? 'text' : 'password'}
        value={value}
        className={`textbox ${className}`}
        onKeyPress={(e)=> {
          this.props.onKeyPress(e);
          if (e.charCode === 13) {
            this.props.onEnterPress(e);
          }
        }}
        onChange={(e) => {
          const {patternRegExp} = this.state;

          if (patternRegExp.test(e.target.value)) {
            this.setState({
              value: this.props.value || e.target.value
            });

            this.props.onChange(e);
          }
        }}
      />
    );
  }
}