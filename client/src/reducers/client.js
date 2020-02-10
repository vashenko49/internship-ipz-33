import * as CLIENT from '../constants/client';

const initialState = {
  loading: true,
  isAuthorization: false,
  enabled: false,
  jwt: '',
  error: '',
  personalInfo: {
    _id: '',
    customerNo: '',
    firstName: '',
    lastName: ''
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
