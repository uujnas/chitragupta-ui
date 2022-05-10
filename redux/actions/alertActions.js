import {
  GET_ERRORS_ALERT,
  CLEAR_ALERTS,
  GET_SUCCESS_ALERT
} from '../actions/types'
//RETURN ERRORS
export const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS_ALERT,
    payload: { message, status, id }
  }
}

//RETURN ALERTS
export const returnAlerts = (message, status, id = null) => {
  return {
    type: GET_SUCCESS_ALERT,
    payload: { message, status, id }
  }
}

//CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ALERTS
  }
}
