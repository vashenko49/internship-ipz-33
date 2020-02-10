import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
