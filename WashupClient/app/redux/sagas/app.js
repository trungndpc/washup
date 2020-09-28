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
  yield takeLatest(type.APP.GET_ACCESSORIES_ASYNC, requestGetAccessorisAsync)
  yield takeLatest(type.APP.GET_BRAND_ASYNC, requestGetBrandAsync)
  yield takeLatest(type.APP.GET_SLICE_ACCESSORIES_ASYNC, requestGetSliceAccessoriesAsync)
  yield takeLatest(type.APP.GET_ACTIVITY_TOP_ASYNC, requestGetActivityAsync)
  yield takeLatest(type.APP.GET_OIL_ASYNC, requestGetOilAsync)
  yield takeLatest(type.APP.GET_HOME_INFO_ASYNC, requestGetHomeInfoAsync)
}

function* requestGetModelAsync() {
  const resp = yield call(getModels)
  yield put({ type: type.APP.GET_MODELS_END, payload: resp })
}

function* requestGetScheduleTodayAsync() {
  const today = yield call(getScheduleToday);
  const tomorow = yield call(getScheduleTomorow);
  const overTomorow = yield call(getScheduleOverTomorrow)
  yield put({ type: type.APP.GET_SCHEDULE_TODAY_END, today: today.data, tomorow: tomorow.data, overTomorow: overTomorow.data })
}

function* requestGetServiceAsync(action) {
  const resp = yield call(getServices, action.transportId, action.typeId, action.brandSeriesId)
  yield put({ type: type.APP.GET_SERVICE_END, payload: resp.data})
}

function* requestServiceHomeAsync(action) {
  let serviceId = action.groupId;
  const respOTO = yield call(getServicesHOME, Model.OTO, serviceId);
  yield put({ type: type.APP.GET_HOME_SERVICE_END, data: respOTO.data, transportId: Model.OTO, serviceId: serviceId })

  const respXEMAY = yield call(getServicesHOME, Model.XEMAY, serviceId);
  yield put({ type: type.APP.GET_HOME_SERVICE_END, data: respXEMAY.data, transportId: Model.XEMAY, serviceId: serviceId })
}
function* requestBookingAsync(action) {
  yield put({ type: type.APP.BOOKING_START })
  const resp = yield call(booking, action.data);
  yield put({ type: type.APP.BOOKING_END, payload: resp })
}

function* requestGetAccessorisAsync() {
  const resp = yield call(getAccessories);
  yield put({ type: type.APP.GET_ACCESSORIES_END, payload: resp.data })
}

function* requestGetBrandAsync(action) {
  const resp = yield call(getBrands, action.transportId);
  yield put({ type: type.APP.GET_BRAND_END, payload: resp.data })
}

function* requestGetSliceAccessoriesAsync(action) {
  const resp = yield call(getSliceAccessories, action.pageNumber, action.pageSize);
  yield put({ type: type.APP.GET_SLICE_ACCESSORIES_END, payload: resp.data })
}

function* requestGetActivityAsync() {
  const resp = yield call(getActivityTop);
  yield put({ type: type.APP.GET_ACTIVITY_TOP_END, payload: resp.data })
}

function* requestGetOilAsync(action) {
  const resp = yield call(getOil, action.brandSeriesId);
  yield put({ type: type.APP.GET_OIL_END, payload: resp.data })
}

function* requestGetHomeInfoAsync() {
  const resp = yield call(getHomeAsync)
  yield put({type: type.APP.GET_HOME_INFO_END, payload: resp.data})
}

function getModels() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/brand-series/all`, resolve, reject);
  });
}

function getBrands(transportId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/brands?category=` + transportId, resolve, reject);
  });
}

function getScheduleTomorow() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/tomorrow`, resolve, reject);
  });
}

function getScheduleOverTomorrow() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/overtomorrow`, resolve, reject);
  });
}

function getScheduleToday() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/schedules/today`, resolve, reject);
  });
}

function getServices(transportId, typeId, brandSeriesId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/services?categories=` + transportId + `&types=` + typeId + `&brandSeriesId=` + brandSeriesId, resolve, reject);
  });
}

function getServicesHOME(transportId, typeId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/services?category=` + transportId + `&type=` + typeId, resolve, reject);
  });
}

function getAccessories() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/accessories/top`, resolve, reject);
  });
}

function getSliceAccessories(pageNumber, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/accessories/all?page=${pageNumber}&pageSize=${pageSize}`, resolve, reject);
  });
}

function getHomeAsync() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/home`, resolve, reject);
  });
}

function getActivityTop() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/activities/top`, resolve, reject);
  });
}

function getOil(brandSeriesId) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/oils/all`, resolve, reject);
  });
}

function booking(data) {
  const body = {
    "phone": data["phone"],
    "pickUpAddress": data["address"],
    "timeSchedule": data["timeSchedule"],
    "customerNote": data["note"],
    "licensePlate": data["licensePlate"],
    "fullName": data["fullname"],
    "paymentMethod": data["paymentMethod"],
    "brandId": data["brand"].id,
    "brandSeriesId": data["brandSeries"].id,
    "serviceIds": data["serviceIds"],
    "vehicleName": data["vehicleName"],
  }

  if (data["oilIds"]) {
    body["oilIds"] = data["oilIds"]
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders`, JSON.stringify(body), resolve, reject);
  });
}

