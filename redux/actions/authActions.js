import axios from 'axios'
import { returnErrors , returnAlerts, clearErrors} from './alertActions'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SET_TOKEN,
  UNSET_TOKEN,
  SET_IS_SERVER
} from './types'

//* set initial token on page access
export const setToken = token => (dispatch, getState) => {
  dispatch({ type: SET_TOKEN, payload: token })
}

// check status of server
export const serverCheck = () => dispatch => {
  dispatch({ type: SET_IS_SERVER })
}

//* check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING })

  axios
    .get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/user.json`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.data.attributes
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({ type: AUTH_ERROR })
    })
}

//* log in user
export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  // request body
  const body = JSON.stringify({ user: { email, password } })
  axios
    .post(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/users/sign_in.json`,
      body,
      config
    )
    .then(res => {
      dispatch(clearErrors())
      dispatch(returnAlerts('Logged in successfully', res.status, 'LOGIN_SUCCESS'))
      dispatch({ type: LOGIN_SUCCESS, payload: res })
      dispatch({ type: SET_TOKEN, payload: res.headers.authorization })
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      )
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

//* logout user
export const logout = () => (dispatch, getState) =>{
  axios
    .delete(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/users/sign_out.json`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(returnAlerts('Logged out successfully', res.status, 'LOGOUT_SUCCESS'))
      dispatch({ type: LOGOUT_SUCCESS })
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGOUT_FAIL')
      )
    })
}

//! setup config headers and token
export const tokenConfig = (getState) => {
  // get token from local storage
  const state = getState();
  // add it to the header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    params: {
      fetch_all: state.records.fetchAllRecords,
      page: state.records.page,
      batch: state.records.batch,
    },
  };
  // if there is a token add to header
  if (state.auth.token) {
    config.headers.Authorization = state.auth.token;
  }
  return config;
};
