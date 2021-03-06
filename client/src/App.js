import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './components/routing/Routes';

import { configureStore } from './store';

import Header from './components/Header/Header';
import './App.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
