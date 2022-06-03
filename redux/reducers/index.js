import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import alertReducers from './alertReducers'
import authReducer from './authReducer'
import leaveReducer from './leaveReducer'
import dashboardReducer from './dashboardReducer'
import userReducer from './usersReducer'

export const SET_IS_SERVER = 'SET_IS_SERVER'

// We hydrate only if this is the initial server render
function hydrate(state = {}, action) {
  const { type } = action
  switch (type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

const combinedReducer = combineReducers({
  alerts: alertReducers,
  auth: authReducer,
  leave: leaveReducer,
  records: dashboardReducer,
  users: userReducer,
})

function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action)
  return hydrate(intermediateState, action)
}

export default rootReducer
