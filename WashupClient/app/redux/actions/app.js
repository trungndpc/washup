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
  return { type: type.APP.GET_SCHEDULE_TODAY_ASYNC }
}

export function getServices(transportId, serviceId) {
  return {
    type: type.APP.GET_SERVICE_ASYNC,
    transportId: transportId,
    serviceId: serviceId
  }
}

export function booking(data) {
  return {
    type: type.APP.BOOKING_ASYNC,
    data: data
  }
}

export function putInforBooking(data) {
  return {
    type: type.APP.PUT_INFO_BOOKING,
    data: data
  }
}

export function getServiceByServiceGroupId(groupId) {
  return {
    type: type.APP.GET_HOME_SERVICE_ASYNC,
    groupId: groupId
  }
}

export function getAccessoriesTop() {
  return {
    type: type.APP.GET_ACCESSORIES_ASYNC
  }
}

export function getAccessories() {
  return { type: type.APP.GET_SLICE_ACCESSORIES_ASYNC }
}

export function getBrands() {
  return {
    type: type.APP.GET_BRAND_ASYNC
  }
}