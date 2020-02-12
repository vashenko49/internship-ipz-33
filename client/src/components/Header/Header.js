import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cloudinary from 'cloudinary-core';

import * as AuthorizationActions from '../../actions/authorizationAction';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import StyledLink from '../Styled/StyledLink';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './Header.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33333A'
    },
    secondary: {
      main: '#fafafa'
    }
  }
});

class Header extends Component {
  render() {
    const { signOut } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const { isAuthorization } = this.props.authorization;
    const { avatarUrl, firstName } = this.props.authorization.personalInfo;
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <div className="header-navbar-buttons">
              <StyledLink to={'/'}>
                <Typography className={'auth-button'} variant="h6">
                  Online chat on real time
                </Typography>
              </StyledLink>
              {isAuthorization ? (
                <Box display="flex" alignItems="center">
                  <StyledLink className={'avatar-client'} to={'/personaldata'}>
                    <Avatar
                      className="avatar-user"
                      alt={firstName}
                      src={new cloudinary.Cloudinary({
                        cloud_name: cloudinary_cloud_name
                      }).url(avatarUrl)}
                    />
                  </StyledLink>
                  <StyledLink
                    to={'/'}
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <Typography className={'auth-button'} variant="h6">
                      Sign out
                    </Typography>
                  </StyledLink>
                </Box>
              ) : (
                <div>
                  <StyledLink className="sidebar-login-link" to={'/authorization'}>
                    <Typography className={'auth-button'} variant="h6">
                      Login
                    </Typography>
                  </StyledLink>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch),
    closeWindowAuth: bindActionCreators(AuthorizationActions.closeWindowAuth, dispatch),
    signOut: bindActionCreators(AuthorizationActions.signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
