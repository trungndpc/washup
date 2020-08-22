/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function getInfoBooking() {
  return {
    type: type.APP.GET_INFO_BOOKING_ASYNC
  }
}

export function booking(data) {
  return {
    type : type.APP.BOOKING_ASYNC,
    data: data
  }
}