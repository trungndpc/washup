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

export function getServices(transportId, typeId, brandSeriesId) {
  return {
    type: type.APP.GET_SERVICE_ASYNC,
    transportId: transportId,
    typeId: typeId,
    brandSeriesId: brandSeriesId
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

export function getAccessories(pageNumber, pageSize) {
  return { type: type.APP.GET_SLICE_ACCESSORIES_ASYNC, pageNumber: pageNumber, pageSize: pageSize }
}

export function getBrands(transportId) {
  return {
    type: type.APP.GET_BRAND_ASYNC,
    transportId: transportId
  }
}

export function getActivityTop() {
  return {
    type: type.APP.GET_ACTIVITY_TOP_ASYNC
  }
}

export function getOil(brandSeriesId) {
  return {
    type: type.APP.GET_OIL_ASYNC,
    brandSeriesId: brandSeriesId
  }
}

export function getHomeInfo() {
  return {
    type: type.APP.GET_HOME_INFO_ASYNC
  }
}

export function getOrderByPhone(phone) {
  return {
    type: type.APP.GET_ORDER_BY_PHONE_ASYNC,
    phone: phone
  }
}

export function changeStatusSearchPhoneModal(status) {
  return {
    type : type.APP.CHANGE_STATUS_SEARCH_PHONE_MODAL,
    status : status
  }
}

export function changeModeBookingModal(mode) {
  return {
    type: type.APP.CHANGE_MODE_BOOKING_MODAL,
    mode: mode
  }
}

export function cancelBooking(id) {
  return {
    type: type.APP.CANCEL_BOOKING_ASYNC,
    id: id
  }
}

export function updateOrder(data) {
  return {
    type: type.APP.UPDATE_ORDER_ASYNC,
    data: data
  }
}