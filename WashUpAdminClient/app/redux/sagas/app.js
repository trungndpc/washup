import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'

export default function* app() {
  yield takeLatest(type.APP.GET_LIST_BOOKING_ASYNC, requestGetListBookingByDateAsync)
  yield takeLatest(type.APP.GET_BOOKING_DETAIL_ASYNC, requestGetBookingDetailById)
  yield takeLatest(type.APP.GET_ORDERS_BY_STATUS_ASYNC, requestOrderByStatus)
  yield takeLatest(type.APP.UPDATE_STATUS_ASYNC, requestUpdateStatusAsync)
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
  yield put({type: type.APP.GET_ORDERS_BY_STATUS_END, payload: resp.data})
}

function* requestUpdateStatusAsync(action) {
  const resp = yield call(postUpdateStatus, action.id, action.status);
  const respLoadData = yield call(getOrderByStatus, action.currentStatus, 0, 10)
  yield put({type: type.APP.GET_ORDERS_BY_STATUS_END, payload: respLoadData.data})
  
}

function getListBookingByDate(datetime, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/orders/all?page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}


function getBookingDetail(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/orders/` + id, resolve, reject);
  });
}

function getOrderByStatus(status, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/orders/order-by-status?status=${status}&page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

function postUpdateStatus(id, status) {
  const body = {
    "storeOrderId": id,
    "status": status,
    
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/orders/update-status`, JSON.stringify(body), resolve, reject);
  });
}