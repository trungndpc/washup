import * as type from '../actions/action-types'

const initialState = {
  bookings: []
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.GET_LIST_BOOKING_END: {
      const resp = action.payload;
      newState.bookings = resp.data
      break
    }
    case type.APP.GET_BOOKING_DETAIL_END: {
      const payload = action.payload;
      newState.booking = payload;
      break;
    }
    default:
      return state
  }
  return newState
}
