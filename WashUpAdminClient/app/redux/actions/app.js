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

export function getEmployee() {
  return {
    type: type.APP.GET_EMPLOYES_ASYNC,
   
  }
}

export function assignEmployee(orderId, employeeId) {
  return {
    type: type.APP.ASSIGN_EMPLOYEE_ASYNC,
    orderId: orderId,
    employeeId: employeeId
  }
}

export function getServices(transportId, groupServiceId) {
  return {
    type: type.APP.GET_SERVICE_ASYNC,
    transportId: transportId,
    groupServiceId: groupServiceId
  }
}

export function getSchedule() {
  return {
    type: type.APP.GET_SCHEDULE_ASYNC
  }
}

export function updateOrder(id, data) {
  return {
    type: type.APP.UPDATE_ORDER_ASYNC,
    data: data,
    id: id
  }
}

export function getOrderByAssignedUser(userId, page, pageSize) {
  return {
    type: type.APP.GET_ORDER_BY_USER_ASSIGNED_ASYNC,
    userId: userId,
    page: page,
    pageSize: pageSize
  }
}