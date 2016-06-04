import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

const FILTERS = [
  { name: 'All', bit: 1 },
  null,
  { name: 'Errors', bit: 2 },
  { name: 'Warnings', bit: 4 },
  { name: 'Info', bit: 8 },
  { name: 'Debug', bit: 16 },
  { name: 'Trace', bit: 32 }
 ];

export default class FilterBar extends React.Component {
  static propTypes = {
    filterBits: React.PropTypes.number,
    filterText: React.PropTypes.string,
    visible: React.PropTypes.bool,
    onFilterBitChange: React.PropTypes.func.isRequired,
    onFilterTextChange:  React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      filterText: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      filterText: props.filterText
    });
  }

  handleFilterTextChange(e) {
    const {value} = e.target;
    this.setState({filterText: value});
    clearTimeout(this._debouncer);
    this._debouncer = setTimeout(() => {
      this.props.onFilterTextChange(value);
    }, 250);
  }

  handleFilterClick(bit, e) {
    this.props.onFilterBitChange(bit, e.metaKey);
  }

  render() {
    const {filterText} = this.state;
    const {filterBits, visible} = this.props;

    return (
      <nav className={classnames('filterbar', { shown: visible })}>
        <div className="filter">
          <input
            type="text"
            placeholder="Filter"
            className="textbox"
            value={filterText}
            onChange={this.handleFilterTextChange.bind(this)}
          />
        </div>
        <ul className="filter-bitset">
          {FILTERS.map((item, index) => {
            if (item) {
              return <li key={index}
                  className={classnames('item', { selected: (item.bit & filterBits) === item.bit  })}
                  title="&#8984; Click to select multiple types"
                  onClick={this.handleFilterClick.bind(this, item.bit)}
                >
                  {item.name}
                </li>;
            }
            return <li key={index} className="divider" />;
          })}
        </ul>
      </nav>
    );
  }
}