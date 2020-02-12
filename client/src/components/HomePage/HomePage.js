import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      load: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = e => {
    e.preventDefault();
    const { room } = this.state;
    const {
      personalInfo: { lastName }
    } = this.props.authorization;
    let path = `/chat?name=${lastName}&room=${room}`;
    this.props.history.push(path);
  };

  render() {
    const { handleChange, submit } = this;
    const { room, load } = this.state;
    const { isAuthorization } = this.props.authorization;
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          {!isAuthorization ? (
            <Typography align={'center'} variant="h1">
              Online chat on real time
            </Typography>
          ) : (
            <ValidatorForm className="personal-info-from" ref="form" onSubmit={submit}>
              <TextValidator
                margin="normal"
                label="Enter a room name"
                onChange={handleChange}
                name="room"
                fullWidth
                value={room}
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required']}
                disabled={load}
              />
              <div className="personal-info-submit-preload-con">
                <Button type="submit" disabled={load} variant="contained" color="primary">
                  Go to room
                </Button>
                {load && <CircularProgress className="preloader" />}
              </div>
            </ValidatorForm>
          )}
        </Container>
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

export default connect(mapStateToProps, null)(HomePage);
