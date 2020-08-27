/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function getListBookingByDate(datetime) {
  return {
    type: type.APP.GET_LIST_BOOKING_ASYNC,
    datetime: datetime
  }
}

export function getBookingById(id) {
  return {
    type: type.APP.GET_BOOKING_DETAIL_ASYNC,
    id: id
  }
}
