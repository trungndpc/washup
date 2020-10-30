import * as type from '../actions/action-types'

const initialState = {
  isLogin : false,
  bookings: [],
  employees: [],
  services: [],
  schedules: {},
  isLoginChecked: false
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
    case type.APP.GET_ORDER_BY_STATUS_DATE_END: {
      const payload = action.payload;
      newState.orderByStausAndDate = payload;
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
    case type.APP.LOGIN_END: {
      let payload = action.payload;
      if (payload["errors"]) {
        newState.isLogin = false;
        newState.loginError = "Username hoặc password chưa đúng"
      }else{
        newState.isLogin = true;
        newState.loginError = false
      }
      break;
    }
    case type.APP.GET_LOGIN_INFO_END: {
      let resp = action.payload;
      newState.isLoginChecked = true
      if (resp && resp.data) {
        newState.isLogin = true;
        newState.user = resp.data;
      }else {
        newState.isLogin = false;
        newState.user = null;
      }
      break;
    }
    case type.APP.GET_ORDER_BY_USER_ASSIGNED_END: {
      newState.orderByUser = action.payload;
      break;
    }
    case type.APP.LOGOUT_END: {
      newState.isLogin = false;
      newState.user = null;
      newState.isLoginChecked = true;
      break;
    }
    case type.APP.RESET_PASSWORD_END: {
      break;
    }
    case type.APP.GET_BRAND_END: {
      newState.brands = action.payload;
      break;
    }
    case type.APP.GET_BRAND_SERIES_END: {
      newState.brandSeries = action.payload;
      break;
    }
    case type.APP.GET_OIL_END: {
      newState.oils = action.payload;
      break;
    }
    case type.APP.GET_SERVICES_ALL_END: {
      newState.servicesALL = action.payload;
      break;
    }
    default:
      return state
  }
  return newState
}
