import { SET_FETCH_ALL_RECORDS, SET_PAGE, SET_BATCH } from './types';
import { fetchLeaveRequests } from './leaveActions';

export const setFetchAllRecords = (fetchAll) => (dispatch) => {
  dispatch({ type: SET_FETCH_ALL_RECORDS, payload: fetchAll });
};

export const setPage = (page) => (dispatch) => {
  dispatch({ type: SET_PAGE, payload: page });
};

export const setBatch = (batch) => (dispatch) => {
  dispatch({ type: SET_BATCH, payload: batch });
};

export const fetchRecords = () => (dispatch) => {
  dispatch(fetchLeaveRequests());
};
