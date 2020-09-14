import * as type from '../actions/action-types'

const initialState = {
  bookings: [],
  employees: [],
  services: [],
  schedules: {},
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
    case type.APP.GET_ORDERS_BY_STATUS_END: {
      const payload = action.payload;
      newState.orderByStatus = payload;
      break;
    }
    case type.APP.GET_EMPLOYES_END: {
      const payload = action.payload;
      newState.employees = payload;
      break;
    }
    case type.APP.GET_SERVICE_END: {
      const payload = action.payload;
      newState.services = payload;
      break;
    }
    case type.APP.GET_SCHEDULE_END: {
      let today = action.today;
      let tomorow = action.tomorow;
      let overTomorow = action.overTomorow;
      let schedules = { ...newState.schedules }
      schedules[1] = today;
      schedules[2] = tomorow;
      schedules[3] = overTomorow;
      newState.schedules = schedules;
      break;
    }
    case type.APP.GET_ORDER_BY_USER_ASSIGNED_END: {
      newState.orderByUser = action.payload;
      break;
    }
    default:
      return state
  }
  return newState
}
