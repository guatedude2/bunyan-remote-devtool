import React from 'react';

export default class Toolbar extends React.Component {
  render() {
    var filterItems = [ 'All', null,'Errors','Warnings','Info','Debug', 'Trace' ];
    return (
      <header className="toolbar">
        <div className="filter">
          <input type="text" />
        </div>
        <ul className="filter-bitset">
          {filterItems.map((item, index) => (
            item ?
              <li key={index} title="&#8984; Click to select multiple types">{item}</li>
            :
              <div key={index} className="divider" />
          ))}
        </ul>
        <div className="actions">
          <span className="status">Server not found</span>
          <button className="icon-button icon-connect" disabled></button>
        </div>
      </header>
    );
  }
}