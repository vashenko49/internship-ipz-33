import * as AUTHORIZATION from '../constants/authorization';
import AuthorizationAPI from '../services/AuthorizationAPI';
import setAuthToken from '../utils/setAuthToken';

export function loginInSystem(userData, callback) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_REQUEST
    });

    callback(userData)
      .then(res => {
        const { token } = res;
        dispatch({
          type: AUTHORIZATION.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: token
        });

        AuthorizationAPI.getCustomerUsingToken(token)
          .then(res => {
            localStorage.setItem('Authorization', token);
            setAuthToken(token);
            res.token = token;
            dispatch({
              type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
              payload: res
            });
          })
          .catch(async e => {
            throw e;
          });
      })
      .catch(() => {
        localStorage.removeItem('Authorization');
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}

export function failSocial() {
  return dispatch => {
    localStorage.removeItem('Authorization');
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_FAILED
    });
  };
}

export function openWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.OPEN_WINDOW_AUTH
    });
  };
}

export function closeWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.CLOSE_WINDOW_AUTH
    });
  };
}

export function AuthorizationThroughLocalStorage(token) {
  return dispatch => {
    if (token) {
      AuthorizationAPI.getCustomerUsingToken(token)
        .then(res => {
          localStorage.setItem('Authorization', token);
          setAuthToken(token);
          res.token = token;
          return dispatch({
            type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
            payload: res
          });
        })
        .catch(() => {
          localStorage.removeItem('Authorization');
          return dispatch({
            type: AUTHORIZATION.LOG_IN_API_FAILED
          });
        });
    }
  };
}

export function updatePersonalData(data) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_REQUEST
    });
    AuthorizationAPI.updatePersonalData(data)
      .then(res => {
        return dispatch({
          type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_SUCCEEDED,
          payload: res
        });
      })
      .catch(err => {
        return dispatch({
          type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_ERROR,
          payload: err.response.data.message
        });
      });
  };
}

export function resetPassword(data) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.RESET_PASSWORD_API_REQUEST
    });
    AuthorizationAPI.resetPassword(data)
      .then(res => {
        return dispatch({
          type: AUTHORIZATION.RESET_PASSWORD_DATA_API_SUCCEEDED,
          payload: res.message
        });
      })
      .catch(err => {
        return dispatch({
          type: AUTHORIZATION.RESET_PASSWORD_DATA_API_ERROR,
          payload: err.response.data.message
        });
      });
  };
}

export function resetError() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.RESET_ERROR
    });
  };
}

export function signOut() {
  return dispatch => {
    localStorage.removeItem('Authorization');
    dispatch({
      type: AUTHORIZATION.LOG_OUT
    });
    setAuthToken();
  };
}
