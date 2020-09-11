/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function getListBookingByDate(datetime, page, pageSize) {
  return {
    type: type.APP.GET_LIST_BOOKING_ASYNC,
    datetime: datetime,
    page: page,
    pageSize: pageSize
  }
}

export function getOrdersByStatus(status, page, pageSize) {
  return {
    type: type.APP.GET_ORDERS_BY_STATUS_ASYNC,
    status: status,
    page: page,
    pageSize: pageSize
  }
}

export function getBookingById(id) {
  return {
    type: type.APP.GET_BOOKING_DETAIL_ASYNC,
    id: id
  }
}

export function updateStatus(id, currentStatus, status) {
  return {
    type: type.APP.UPDATE_STATUS_ASYNC,
    id: id,
    status: status,
    currentStatus: currentStatus
  }
}
