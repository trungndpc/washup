import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'
import { Model } from '../../constants/Constants';

export default function* app() {
  yield takeLatest(type.APP.GET_MODELS_ASYNC, requestGetModelAsync)
  yield takeLatest(type.APP.GET_SCHEDULE_TODAY_ASYNC, requestGetScheduleTodayAsync)
  yield takeLatest(type.APP.GET_SERVICE_ASYNC, requestGetServiceAsync)
  yield takeLatest(type.APP.BOOKING_ASYNC, requestBookingAsync)
  yield takeLatest(type.APP.GET_HOME_SERVICE_ASYNC, requestServiceHomeAsync)
}

function* requestGetModelAsync() {
  const resp = yield call(getModels)
  yield put({ type: type.APP.GET_MODELS_END, payload: resp })
}

function* requestGetScheduleTodayAsync() {
  const today = yield call(getScheduleToday);
  const tomorow = yield call(getScheduleTomorow);
  yield put({ type: type.APP.GET_SCHEDULE_TODAY_END, today: today.data, tomorow: tomorow.data })
}

function* requestGetServiceAsync(action) {
  const resp = yield call(getServices, action.transportId, action.serviceId)
  yield put({ type: type.APP.GET_SERVICE_END, data: resp.data, transportId: action.transportId, serviceId: action.serviceId })
}

function* requestServiceHomeAsync(action) {
  let serviceId = action.groupId;
  const respOTO = yield call(getServices, Model.OTO, serviceId);
  yield put({ type: type.APP.GET_SERVICE_END, data: respOTO.data, transportId: Model.OTO, serviceId: serviceId })

  const respXEMAY = yield call(getServices, Model.XEMAY, serviceId);
  yield put({ type: type.APP.GET_SERVICE_END, data: respXEMAY.data, transportId: Model.XEMAY, serviceId: serviceId })
}
function* requestBookingAsync(action) {
  yield put({ type: type.APP.BOOKING_START })
  const resp = yield call(booking, action.data);
  yield put({ type: type.APP.BOOKING_END, payload: resp })
}

function getModels() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/model-series/all`, resolve, reject);
  });
}

function getScheduleTomorow() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/tomorrow`, resolve, reject);
  });
}

function getScheduleToday() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/today`, resolve, reject);
  });
}

function getServices(transportId, serviceId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/services?category=` + transportId + `&type=` + serviceId, resolve, reject);
  });
}

function booking(data) {
  const body = {
    "phone": data["phone"],
    "pickUpAddress": data["address"],
    "timeSchedule": data["timeSchedule"],
    "note": data["note"],
    "licensePlate": data["licensePlate"],
    "fullName": data["fullname"],
    "paymentMethod": data["paymentMethod"],
    "modelId": data["model"],
    "serviceIds": [data["serviceId"]]
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders`, JSON.stringify(body), resolve, reject);
  });
}

