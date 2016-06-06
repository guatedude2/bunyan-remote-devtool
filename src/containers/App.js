import React from 'react';
import { connect } from 'react-redux';

import { toggleFilters } from '../actions/app';
import {
  setFilterText,
  setFilterBit,
  clearHistory,
  clearFilters
} from '../actions/client';

import ToolBar from '../components/ToolBar';
import FilterBar from '../components/FilterBar';
import ContextMenu from '../components/ContextMenu';
import AuthPanel from '../components/AuthPanel';
import HistoryPane from '../components/HistoryPane';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    filteredCount: React.PropTypes.number,
    filtersVisible: React.PropTypes.bool,
    filterBits: React.PropTypes.number,
    filterText: React.PropTypes.string,
    clientStatus: React.PropTypes.string,
    history: React.PropTypes.array,
  };

  handleTagClick(tag) {
    const { dispatch, filtersVisible } = this.props;

    if (!filtersVisible) {
      dispatch(toggleFilters());
    }
    dispatch(setFilterText(tag));
  }

  handleClearFilters() {
    const { dispatch } = this.props;
    dispatch(clearFilters());
  }

  render() {
    const {
      dispatch,
      filteredCount,
      filtersVisible,
      filterBits,
      filterText,
      clientStatus,
      history
    } = this.props;

    console.log(filteredCount)

    return (
      <section className="app">
        <header className="header">
          <ToolBar
            clientStatus={clientStatus}
            filtersVisible={filtersVisible}
            onFiltersClick={() => { dispatch(toggleFilters()); }}
            onClearHistoryClick={() => { dispatch(clearHistory()); }}
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
          onTagClick={this.handleTagClick.bind(this)}
          onClearFiltersClick={this.handleClearFilters.bind(this)}
        />
        <AuthPanel type="user" visible={false} />
        <ContextMenu className="options-menu" visible={false} />
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  filteredCount: (state.client.history.length - state.client.filteredHistory.length),
  filtersVisible: state.app.filtersVisible,
  filterBits: state.client.filterBits,
  filterText: state.client.filterText,
  clientStatus: state.client.status,
  history: state.client.filteredHistory,
});

App = connect(mapStateToProps)(App);
export default App;