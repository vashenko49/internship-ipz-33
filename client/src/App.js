import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './components/routing/Routes';

import { configureStore } from './store';

import './App.scss';
import Header from './components/Header/Header';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Router>
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
