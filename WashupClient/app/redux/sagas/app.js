import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'

export default function* app() {
  yield takeLatest(type.APP.GET_MODELS_ASYNC, requestGetModelAsync)
  yield takeLatest(type.APP.GET_SCHEDULE_TODAY_ASYNC, requestGetScheduleTodayAsync)
  yield takeLatest(type.APP.GET_SERVICE_ASYNC, requestGetServiceAsync)
  yield takeLatest(type.APP.BOOKING_ASYNC, requestBookingAsync)
}

function* requestGetModelAsync() {
  const resp = yield call(getModels)
  yield put({ type: type.APP.GET_MODELS_END, payload: resp })
}

function* requestGetScheduleTodayAsync() {
  const resp = yield call(getScheduleToday)
  yield put({ type: type.APP.GET_SCHEDULE_TODAY_END, payload: resp })
}

function* requestGetServiceAsync() {
  const resp = yield call(getServices)
  yield put({ type: type.APP.GET_SERVICE_END, payload: resp })
}

function* requestBookingAsync(action) {
  yield put({ type: type.APP.BOOKING_START })
  const resp = yield call(booking, action.data);
  yield put({ type: type.APP.BOOKING_END, payload: resp })
}

function getModels() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/models/all`, resolve, reject);
  });
}

function getScheduleToday() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/today`, resolve, reject);
  });
}

function getServices() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/services?category=1&type=1`, resolve, reject);
  });
}

function booking(data) {
  const body = {
    "phone" : data["phone"],
    "pickUpAddress" : data["address"],
    "timeSchedule" : data["timeSchedule"],
    "note" : data["note"],
    "licensePlate" : data["licensePlate"],
    "fullName" : data["fullname"],
    "paymentMethod" : data["paymentMethod"],
    "modelId" : data["model"],
    "serviceIds" : [data["serviceId"]]
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders`,JSON.stringify(body), resolve, reject);
  });
}

