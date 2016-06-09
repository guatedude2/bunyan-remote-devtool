import React from 'react';
import classnames from 'classnames';

const FILTERS = [
  { name: 'All', bit: 1 },
  null,
  { name: 'Fatal', bit: 2 },
  { name: 'Errors', bit: 4 },
  { name: 'Warnings', bit: 8 },
  { name: 'Info', bit: 16 },
  { name: 'Debug', bit: 32 },
  { name: 'Trace', bit: 64 }
 ];

export default class FilterBar extends React.Component {
  static propTypes = {
    filterBits: React.PropTypes.number,
    filterText: React.PropTypes.string,
    visible: React.PropTypes.bool,
    onFilterBitChange: React.PropTypes.func.isRequired,
    onFilterTextChange:  React.PropTypes.func.isRequired
  };

  render() {
    const {filterText, filterBits, visible} = this.props;

    return (
      <nav className={classnames('filterbar', { shown: visible })}>
        <div className="filter">
          <input
            type="text"
            placeholder="Filter"
            className="textbox"
            value={filterText}
            onChange={(e) => {
              this.props.onFilterTextChange(e.target.value);
            }}
          />
        </div>
        <ul className="filter-bitset">
          {FILTERS.map((item, index) => {
            if (item) {
              return (
                <li key={index}
                  className={classnames('item', { selected: (item.bit & filterBits) === item.bit  })}
                  title={'⌘ Click to select multiple types'}
                  onClick={(e) => {
                    this.props.onFilterBitChange(item.bit, e.metaKey);
                  }}
                >
                  {item.name}
                </li>
              );
            }
            return (<li key={index} className="divider" />);
          })}
        </ul>
      </nav>
    );
  }
}