import axios from 'axios'
import {
  GET_LEAVE_REQUESTS,
  ADD_LEAVE_REQUEST,
  DELETE_LEAVE_REQUEST,
  UPDATE_LEAVE_REQUEST,
  SET_SELECTED_LEAVE,
  LEAVE_REQUESTS_LOADING,
  SHOW_LEAVE_MODAL
} from './types'
import { returnErrors,returnAlerts, clearErrors } from './alertActions'
import { tokenConfig } from './authActions'
import Jsona from 'jsona'

const dataFormatter = new Jsona()

//adding leave a new leave request
export const addLeaveRequest = () => (dispatch, getState) => {
  dispatch(setLoadingState(true))
  const leaveData = getState().leave.selectedLeave
  const body = JSON.stringify({ leave_request: leaveData })
  axios
    .post(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: ADD_LEAVE_REQUEST,
        payload: dataFormatter.deserialize(res.data)
      })
      dispatch(setLeaveModal(false))
      dispatch(returnAlerts('Leave Request Added Successfully', res.status, 'LEAVE_REQUEST_ADDED'))
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//action to get leave requests
export const fetchLeaveRequests = allRequests => (dispatch, getState) => {
  dispatch(setLoadingState(true))
  axios
    .get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json?all_leaves=${allRequests}`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: GET_LEAVE_REQUESTS,
        payload: dataFormatter.deserialize(res.data)
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//set selected leave requests
export const setSelectedLeave = leave => dispatch => {
  dispatch({ type: SET_SELECTED_LEAVE, payload: leave })
}

//get leave requests by id
export const getLeaveById = id => (dispatch, getState) => {
  dispatch(setLoadingState(true))
  axios
    .get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests/${id}.json`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: SET_SELECTED_LEAVE,
        payload: dataFormatter.deserialize(res.data)
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//action to show hide leave modal
export const setLeaveModal = modal => dispatch => {
  dispatch(clearErrors())
  dispatch({ type: SHOW_LEAVE_MODAL, payload: modal })
}

//action to update leave requests
export const updateLeaveRequest = () => (dispatch, getState) => {
  //get currently selected leave
  const leave_request = getState().leave.selectedLeave
  const body = JSON.stringify({ leave_request: leave_request })
  axios
    .put(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests/${leave_request.id}.json`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({ type: UPDATE_LEAVE_REQUEST })
      dispatch(fetchLeaveRequests(true))
      dispatch(setLeaveModal(false))
      dispatch(returnAlerts('Leave Request updated Successfully', res.status, 'LEAVE_REQUEST_UPDATED'))
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const setLoadingState = state => dispatch => {
  dispatch({ type: LEAVE_REQUESTS_LOADING, payload: state })
}
