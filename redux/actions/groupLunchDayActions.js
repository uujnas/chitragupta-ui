import axios from 'axios'
import { GET_RECORDS } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './alertActions'

export const fetchGroupLunchDayRequest = () => (dispatch, getState) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/group_lunch_days.json`,
      tokenConfig(getState),
    )
    .then((res) => {
      dispatch({
        type: GET_RECORDS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response && err.response.data,
          err.response && err.response.status,
        ),
      )
    })
}
