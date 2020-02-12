import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Authorization from '../Authorization';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as AuthorizationActions from '../../../actions/authorizationAction';
import Box from '@material-ui/core/Box';

class AuthorizationPage extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isAuthorization } = this.props.authorization;
    if (isAuthorization) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { isAuthorization } = this.props.authorization;
    const { signOut } = this.props;

    return (
      <Container>
        {!isAuthorization ? (
          <>
            <Authorization />
          </>
        ) : (
          <Box mt={4} display={'flex'} justifyContent="center">
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </Button>
          </Box>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: bindActionCreators(AuthorizationActions.signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
