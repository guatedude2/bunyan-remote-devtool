import React from 'react';
import Toolbar from '../components/Toolbar';
import AuthPanel from '../components/AuthPanel';

export default class App extends React.Component {
  render() {
    return (
      <section className="app">
        <Toolbar />
        <AuthPanel />
        Hello World
      </section>
    );
  }
}