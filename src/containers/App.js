import React from 'react';
import { connect } from 'react-redux';

import { toggleFilters } from '../actions/app';
import {
  changeServerPort,
  setFilterText,
  setFilterBit,
  clearHistory,
  clearFilters,
  setPreserveHistory
} from '../actions/client';

import ToolBar from '../components/ToolBar';
import FilterBar from '../components/FilterBar';
import ContextMenu from '../components/ContextMenu';
import AuthPanel from '../components/AuthPanel';
import HistoryPane from '../components/HistoryPane';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    serverPort: React.PropTypes.string,
    clientStatus: React.PropTypes.string,
    filteredCount: React.PropTypes.number,
    filtersVisible: React.PropTypes.bool,
    filterBits: React.PropTypes.number,
    filterText: React.PropTypes.string,
    preserveHistory: React.PropTypes.bool,
    history: React.PropTypes.array,
  };

  render() {
    const {
      dispatch,
      serverPort,
      clientStatus,
      filteredCount,
      filtersVisible,
      filterBits,
      filterText,
      preserveHistory,
      history
    } = this.props;
    return (
      <section className="app">
        <header className="header">
          <ToolBar
            serverPort={serverPort}
            clientStatus={clientStatus}
            filtersVisible={filtersVisible}
            preserveHistory={preserveHistory}
            serverPort={serverPort}
            onPortChange={(port) => { dispatch(changeServerPort(port)); }}
            onFiltersClick={() => { dispatch(toggleFilters()); }}
            onClearHistoryClick={() => { dispatch(clearHistory()); }}
            onPreserveHistoryClick={(enabled) => { dispatch(setPreserveHistory(enabled)); }}
          />
          <FilterBar
            visible={filtersVisible}
            filterBits={filterBits}
            filterText={filterText}
            onFilterTextChange={(filterText) => { dispatch(setFilterText(filterText)); }}
            onFilterBitChange={(filterBit, modifier) => { dispatch(setFilterBit(filterBit, modifier));
            }}
          />
        </header>
        <HistoryPane
          history={history}
          filteredCount={filteredCount}
          onTagClick={(tag) => {
            if (!filtersVisible) dispatch(toggleFilters());
            dispatch(setFilterText(tag));
          }}
          onClearFiltersClick={() => { dispatch(clearFilters()); }}
        />
        <AuthPanel type="user" visible={false} />
        <ContextMenu className="options-menu" visible={false} />
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  serverPort: state.client.serverPort,
  filteredCount: (state.client.history.length - state.client.filteredHistory.length),
  filtersVisible: state.app.filtersVisible,
  filterBits: state.client.filterBits,
  filterText: state.client.filterText,
  preserveHistory: state.client.preserveHistory,
  clientStatus: state.client.status,
  history: state.client.filteredHistory,
});

App = connect(mapStateToProps)(App);
export default App;