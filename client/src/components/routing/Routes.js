import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import AuthorizationPage from '../Authorization/AuthorizationPage/AuthorizationPage';
import HomePage from '../HomePage/HomePage';
import PersonalProfile from '../PersonalData/PersonalData';
import PrivateRoute from './PrivateRoute';
import Chat from '../Chat/Chat';
import PasswordRecovery from '../Authorization/PasswordRecovery/PasswordRecovery';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/authorization*" component={AuthorizationPage} />
        <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} />
        <Route exact path="/personaldata" component={PersonalProfile} />
        <PrivateRoute exact path="/chat" component={Chat} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
