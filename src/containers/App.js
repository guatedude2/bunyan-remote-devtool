import React from 'react';
import { connect } from 'react-redux';

import {toggleFilters, setFilterText, setFilterBit} from '../actions/app';

import ToolBar from '../components/ToolBar';
import FilterBar from '../components/FilterBar';
import ContextMenu from '../components/ContextMenu';
import AuthPanel from '../components/AuthPanel';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    filtersVisible: React.PropTypes.bool,
    filterBits: React.PropTypes.number
  };

  render() {
    const {filtersVisible, filterBits, dispatch} = this.props;

    return (
      <section className="app">
        <ToolBar
          filtersVisible={filtersVisible}
          onFiltersClick={() => { dispatch(toggleFilters()); }}
        />
        <FilterBar
          visible={filtersVisible}
          filterBits={filterBits}
          onFilterTextChange={(filterText) => { dispatch(setFilterText(filterText)); }}
          onFilterBitChange={(filterBit, modifier) => { dispatch(setFilterBit(filterBit, modifier));

          }}
        />
        <AuthPanel type="user" visible={false} />
        <ContextMenu className="options-menu" visible={false} />
        Hello World
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  filtersVisible: state.app.filtersVisible,
  filterBits: state.app.filterBits
});

App = connect(mapStateToProps)(App);
export default App;