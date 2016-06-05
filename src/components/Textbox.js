import React from 'react';

export default class Textbox extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    pattern: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    onChange: e => e
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
      patternRegExp: props.pattern !== undefined ? new RegExp(`^${props.pattern}$`) : this.state.pattern
    });
  }

  handleChange(e) {
    const {patternRegExp} = this.state;

    if (patternRegExp.test(e.target.value)) {

      this.setState({
        value: this.props.value || e.target.value
      });

      this.props.onChange(e);
    }
  }

  render() {
    const {value} = this.state;
    const {className} = this.props;

    return (
      <input
        {...this.props}
        type="text"
        value={value}
        className={`textbox ${className}`}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}