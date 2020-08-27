/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function getModels() {
  return {
    type: type.APP.GET_MODELS_ASYNC
  }
}

export function getScheduleToday() {
  return  {type: type.APP.GET_SCHEDULE_TODAY_ASYNC}
}

export function getServices(transportId) {
  return {
    type: type.APP.GET_SERVICE_ASYNC,
    transportId: transportId
  }
}

export function booking(data) {
  return {
    type : type.APP.BOOKING_ASYNC,
    data: data
  }
}

export function putInforBooking(data) {
  return {
    type: type.APP.PUT_INFO_BOOKING,
    data: data
  }
}