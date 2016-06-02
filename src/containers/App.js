import React from 'react';
import { connect } from 'react-redux';

import {toggleFilters, setFilterText, setFilterBit} from '../actions/app';

import ToolBar from '../components/ToolBar';
import FilterBar from '../components/FilterBar';
import ContextMenu from '../components/ContextMenu';
import AuthPanel from '../components/AuthPanel';
import HistoryPane from '../components/HistoryPane';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    filtersVisible: React.PropTypes.bool,
    filterBits: React.PropTypes.number,
    clientStatus: React.PropTypes.string,
    history: React.PropTypes.array,
  };

  render() {
    const {
      dispatch,
      filtersVisible,
      filterBits,
      clientStatus,
      history
    } = this.props;

    return (
      <section className="app">
        <header className="header">
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
        </header>
        <HistoryPane history={history} />
        <AuthPanel type="user" visible={false} />
        <ContextMenu className="options-menu" visible={false} />
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  filtersVisible: state.app.filtersVisible,
  filterBits: state.app.filterBits,
  clientStatus: state.client.status,
  history: state.client.history,
});

App = connect(mapStateToProps)(App);
export default App;