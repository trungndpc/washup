import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import * as OrderConstant from '../../constants/order'
import APIUtils from '../../utils/APIUtils'
import AlertUtils from '../../utils/AlertUtils'

export default function* app() {
  yield takeLatest(type.APP.GET_LIST_BOOKING_ASYNC, requestGetListBookingByDateAsync)
  yield takeLatest(type.APP.GET_BOOKING_DETAIL_ASYNC, requestGetBookingDetailById)
  yield takeLatest(type.APP.GET_ORDERS_BY_STATUS_ASYNC, requestOrderByStatus)
  yield takeLatest(type.APP.UPDATE_STATUS_ASYNC, requestUpdateStatusAsync)
  yield takeLatest(type.APP.GET_EMPLOYES_ASYNC, requestGetEmployeeAsync)
  yield takeLatest(type.APP.ASSIGN_EMPLOYEE_ASYNC, requestAssignEmployeeAsync)
  yield takeLatest(type.APP.GET_SERVICE_ASYNC, requestGetServiceAsync)
  yield takeLatest(type.APP.GET_SCHEDULE_ASYNC, requestGetScheduleAsync)
  yield takeLatest(type.APP.UPDATE_ORDER_ASYNC, requestUpdateOrderAsync)
  yield takeLatest(type.APP.GET_ORDER_BY_USER_ASSIGNED_ASYNC, requestGetOrderByUserIdAsync)
  yield takeLatest(type.APP.GET_ORDER_BY_STATUS_DATE_ASYNC, requestGetOrderByStatusAndDateAsync)
  yield takeLatest(type.APP.GET_LOGIN_INFO_ASYNC, requestGetLoginInfoAsync)
  yield takeLatest(type.APP.LOGIN_ASYNC, requestLoginAsync)
}

function* requestGetListBookingByDateAsync(action) {
  const data = yield call(getListBookingByDate, action.datetime, action.page, action.pageSize)
  yield put({ type: type.APP.GET_LIST_BOOKING_END, payload: data })
}

function* requestGetBookingDetailById(action) {
  const resp = yield call(getBookingDetail, action.id);
  yield put({ type: type.APP.GET_BOOKING_DETAIL_END, payload: resp.data })
}

function* requestOrderByStatus(action) {
  const resp = yield call(getOrderByStatus, action.status, action.page, action.pageSize)
  yield put({ type: type.APP.GET_ORDERS_BY_STATUS_END, payload: resp.data })
}

function* requestUpdateStatusAsync(action) {
  const resp = yield call(postUpdateStatus, action.id, action.status, action.note);
  AlertUtils.showSuccess("Cập nhật trạng thái đơn hàng thành công")
  const respLoadData = yield call(getOrderByStatus, action.currentStatus, 0, 10)
  const respDetailOrder = yield call(getBookingDetail, action.id);
  yield put({ type: type.APP.GET_ORDERS_BY_STATUS_END, payload: respLoadData.data })
  yield put({ type: type.APP.GET_BOOKING_DETAIL_END, payload: respDetailOrder.data })
}

function* requestAssignEmployeeAsync(action) {
  const resp = yield call(postAssignEmployee, action.orderId, action.employeeId, action.note);
  if (!resp.errorCode) {
    yield call(postUpdateStatus, action.orderId, OrderConstant.Status.EMP_ASSIGNED.value, '')
    AlertUtils.showSuccess("Phân công nhân viên thành công,...")
    const resp = yield call(getBookingDetail, action.orderId);
    yield put({ type: type.APP.GET_BOOKING_DETAIL_END, payload: resp.data })
  }
}

function* requestGetOrderByUserIdAsync(action) {
  const resp = yield call(getOrderByUserId, action.userId, action.page, action.pageSize);
  yield put({ type: type.APP.GET_ORDER_BY_USER_ASSIGNED_END, payload: resp.data })
}

function* requestGetEmployeeAsync() {
  const resp = yield call(getEmployee);
  yield put({ type: type.APP.GET_EMPLOYES_END, payload: resp.data })
}

function* requestGetServiceAsync(action) {
  const resp = yield call(getServices, action.transportId, action.groupServiceId, action.brandSeriesId)
  yield put({ type: type.APP.GET_SERVICE_END, payload: resp.data })
}

function* requestGetScheduleAsync() {
  const today = yield call(getScheduleToday);
  const tomorow = yield call(getScheduleTomorow);
  const overTomorow = yield call(getScheduleOverTomorrow)
  yield put({ type: type.APP.GET_SCHEDULE_END, today: today.data, tomorow: tomorow.data, overTomorow: overTomorow.data })
}

function* requestUpdateOrderAsync(action) {
  const resp = yield call(postUpdateOrder, action.id, action.data);
  AlertUtils.showSuccess("Cập nhật đơn hàng thành công!")
  const respDetailOrder = yield call(getBookingDetail, action.id);
  yield put({ type: type.APP.GET_BOOKING_DETAIL_END, payload: respDetailOrder.data })
}

function* requestGetOrderByStatusAndDateAsync(action) {
  const resp = yield call(getOrderByStatusAndDate, action.status, action.date, action.page, action.pageSize);
  yield put({ type: type.APP.GET_ORDER_BY_STATUS_DATE_END, payload: resp.data })
}

function* requestGetLoginInfoAsync() {
  const resp = yield call(getLoginInfo);
  yield put({ type: type.APP.GET_LOGIN_INFO_END, payload: resp.data })
}

function* requestLoginAsync(action) {
  const resp = yield call(login, action.username, action.password);
  yield put({ type: type.APP.LOGIN_END, payload: resp})
}

function getListBookingByDate(datetime, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/all?page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

function getOrderByStatusAndDate(status, date, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/order-by-date-and-status?date=${date}&status=${status}&page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}


function getBookingDetail(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/` + id, resolve, reject);
  });
}

function getOrderByStatus(status, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/order-by-status?status=${status}&page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

function postUpdateStatus(id, status, note) {
  const body = {
    "storeOrderId": id,
    "status": status,
    "operatorNote": note
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/update-status`, JSON.stringify(body), resolve, reject);
  });
}

function getEmployee() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/user-by-permission?permission=2`, resolve, reject);
  });
}

function postAssignEmployee(orderId, employeeId, note) {
  const body = {
    "storeOrderId": orderId,
    "userId": employeeId,
    "operatorNote": note
  }

  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/assign-employee`, JSON.stringify(body), resolve, reject);
  });
}

function postUpdateOrder(orderId, data) {
  console.log("postUpdateOrder")
  const body = {
    "id": orderId,
    "fullName": data["fullName"],
    "pickUpAddress": data["address"],
    "timeSchedule": data["timeSchedule"],
    "serviceIds": data["serviceIds"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/update-order`, JSON.stringify(body), resolve, reject);
  });
}

function getServices(transportId, groupServiceId, brandSeriesId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/services?categories=` + transportId + `&types=` + groupServiceId + `&brandSeriesId=` + brandSeriesId, resolve, reject);
  });
}

function getScheduleTomorow() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/schedules/tomorrow`, resolve, reject);
  });
}

function getScheduleOverTomorrow() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/schedules/overtomorrow`, resolve, reject);
  });
}

function getScheduleToday() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/schedules/today`, resolve, reject);
  });
}

function getOrderByUserId(userId, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/assigned-order?userId=${userId}&page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

function getLoginInfo() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/login-info`, resolve, reject);
  });
}

function login(username, password) { 
  const body = {
    "username": username,
    "password": password,
    "rememberMe": true
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/users/login`, JSON.stringify(body), resolve, reject);
  });
}