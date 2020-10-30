import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import * as OrderConstant from '../../constants/order'
import APIUtils from '../../utils/APIUtils'
import AlertUtils from '../../utils/AlertUtils'
import { register } from '../actions/app'

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
  yield takeLatest(type.APP.LOGOUT_ASYNC, requestLogoutAsync)
  yield takeLatest(type.APP.RESET_PASSWORD_ASYNC, requestResetPasswordAsync)
  yield takeLatest(type.APP.REGISTER_ASYNC, requestRegisterAsync)
  yield takeLatest(type.APP.DELETE_USER_ASYNC, requestDeleteUserAsync)
  yield takeLatest(type.APP.GET_BRAND_ASYNC, requestGetBrandAsync)
  yield takeLatest(type.APP.GET_BRAND_SERIES_ASYNC, requestBrandSeriesAsync)
  yield takeLatest(type.APP.GET_OIL_ASYNC, requestGetOilAsync)
  yield takeLatest(type.APP.GET_SERVICES_ALL_ASYNC, requestGetServiceALLAsync)
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
  const resp = yield call(getOrderByUserId, action.userId, action.date, action.status, action.page, action.pageSize);
  yield put({ type: type.APP.GET_ORDER_BY_USER_ASSIGNED_END, payload: resp.data })
}

function* requestGetEmployeeAsync(action) {
  const resp = yield call(getEmployee, action.roleId);
  yield put({ type: type.APP.GET_EMPLOYES_END, payload: resp.data })
}

function* requestGetServiceAsync(action) {
  const resp = yield call(getServices, action.transportId, action.groupServiceId, action.brandSeriesId)
  yield put({ type: type.APP.GET_SERVICE_END, payload: resp.data })
}

function* requestGetBrandAsync(action) {
  const resp = yield call(getBrand, action.cateId)
  yield put({type: type.APP.GET_BRAND_END, payload: resp.data})
}

function* requestBrandSeriesAsync() {
  const resp = yield call(getBrandSeries)
  yield put({type: type.APP.GET_BRAND_SERIES_END, payload: resp.data})
}

function* requestGetOilAsync() {
  const resp = yield call(getOil) 
  yield put({type: type.APP.GET_OIL_END, payload: resp.data})
}

function* requestGetServiceALLAsync() {
  const resp = yield call(getServicesALL)
  yield put({type: type.APP.GET_SERVICES_ALL_END, payload: resp.data})
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
  yield put({ type: type.APP.GET_LOGIN_INFO_END, payload: resp })
}

function* requestLoginAsync(action) {
  const resp = yield call(login, action.username, action.password);
  if (!resp["errors"]) {
    const loginResp = yield call(getLoginInfo);
    yield put({ type: type.APP.GET_LOGIN_INFO_END, payload: loginResp })
  }
  yield put({ type: type.APP.LOGIN_END, payload: resp })
}

function* requestLogoutAsync() {
  const resp = yield call(logout)
  yield put({ type: type.APP.LOGOUT_END, payload: resp })
}

function* requestResetPasswordAsync(action) {
  const resp = yield call(resetPassword, action.userId)
  AlertUtils.showSuccess("Reset mật khẩu thành công")
  yield put({ type: type.APP.RESET_PASSWORD_END, payload: resp })
}

function* requestRegisterAsync(action) {
  const resp = yield call(registerUser, action.data);
  AlertUtils.showSuccess("Đăng ký nhân viên mới thành công")
  window.goTo("/user")
  yield put({ type: type.APP.REGISTER_END, payload: resp });
}

function* requestDeleteUserAsync(action) {
  const resp = yield call(deleteUser, action.userId);
  AlertUtils.showSuccess("Xóa nhân viên thành công")
  window.goTo("/user");
  yield put({ type: type.APP.DELETE_USER_END, payload: resp });
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

function getEmployee(roleId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/user-by-permission?permission=${roleId}`, resolve, reject);
  });
}

function postAssignEmployee(orderId, employeeId, note) {
  const body = {
    "storeOrderId": orderId,
    "userIds": employeeId,
    "operatorNote": note
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/assign-employee`, JSON.stringify(body), resolve, reject);
  });
}

function resetPassword(userId) {
  const body = {
    userId: userId
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/reset-password`, JSON.stringify(body), resolve, reject);
  });
}

function deleteUser(userId) {
  const body = {
    userId: userId
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/disable-user`, JSON.stringify(body), resolve, reject);
  });
}

function registerUser(data) {
  const body = {
    "username": data.username,
    "password": "washup@123",
    "fullName": data.name,
    "email": data.username + "@wash-up.vn",
    "permissionTypes": [data.roleId]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/users`, JSON.stringify(body), resolve, reject);
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

function getBrand(cateId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/brands?category=` + cateId, resolve, reject);
  });
}

function getBrandSeries() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/brand-series/all`, resolve, reject);
  });
}

function getServicesALL() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/services/all`, resolve, reject);
  });
}

function getOil() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/oils/all`, resolve, reject);
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

function getOrderByUserId(userId, date, status, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/orders/assigned-order?userId=${userId}&date=${date}&statuses=${status}&page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

function getLoginInfo() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/user-info`, resolve, reject);
  });
}

function login(username, password) {
  const body = {
    "username": username,
    "password": password,
    "rememberMe": true
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/login`, JSON.stringify(body), resolve, reject);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/users/logout`, JSON.stringify({}), resolve, reject);
  });
}