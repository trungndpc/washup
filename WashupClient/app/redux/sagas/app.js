import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'
import { Model } from '../../constants/Constants';
import AlertUtils from '../../utils/AlertUtils';
import ServiceModel from '../../models/ServiceModel';


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
  yield takeLatest(type.APP.GET_ORDER_BY_PHONE_ASYNC, requestGetOrderByPhoneAsync)
  yield takeLatest(type.APP.CANCEL_BOOKING_ASYNC, cancelBookingAsync)
  yield takeLatest(type.APP.UPDATE_ORDER_ASYNC, requestUpdateOrderAsync)
  yield takeLatest(type.APP.CALCULATION_PRICE_ASYNC, requestPostEstimatePriceAsync)
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

function* requestUpdateOrderAsync(action) {
  const resp = yield call(updateOrder, action.data);
  if (!resp.errors) {
    window.closeFormModal();
  }
  yield put({ type: type.APP.UPDATE_ORDER_END, payload: resp })
}

function* requestPostEstimatePriceAsync(action) {
  const resp = yield call(postEstimatePrice, action.data);
  yield put({type: type.APP.CALCULATION_PRICE_END, payload: resp})
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

function* requestGetOrderByPhoneAsync(action) {
  const resp = yield call(getOrderByPhone, action.phone)
  if (resp.errors) {
    yield put({type: type.APP.GET_ORDER_BY_PHONE_END, payload: {error: -9, errMsg : 'Không tìm thấy lịch đặt'}})
  }else {
    let formData = {};
    let apiData = resp.data;
    formData["id"] = apiData["id"]
    formData["phone"] = apiData["phone"];
    formData["address"] = apiData["pickUpAddress"];
    formData["fullname"] = apiData["fullName"];
    formData["note"] = apiData["customerNote"];
    formData["licensePlate"] = apiData["licensePlate"];
    formData["vehicleName"] = apiData["vehicleName"];
    formData["timeSchedule"] = apiData["timeSchedule"];
    formData["paymentMethod"] = apiData["paymentMethod"];
    formData["totalPrice"] = apiData["totalPrice"];
    formData["brandSeries"] = apiData["brandSeries"];
    formData["brand"] = apiData["brand"];
    let listServiceIds = [];
    let listServiceNames = [];
    let apiServices = apiData["services"];
    apiServices.forEach(services => {
      listServiceIds.push(services["id"]);
      listServiceNames.push(services["name"]);
    });
    formData["serviceIds"] = listServiceIds;
    formData["serviceNames"] = listServiceNames;

    yield put({type: type.APP.CHANGE_STATUS_SEARCH_PHONE_MODAL, status: false});
    yield put({type: type.APP.PUT_INFO_BOOKING, data: formData});
    yield put({type: type.APP.CHANGE_MODE_BOOKING_MODAL, mode: 2})
    window.openBookingModal(4);
  }
}

function* cancelBookingAsync(action) {
  const resp = yield call(cancelBooking, action.id)
  if (!resp.errors) {
    window.closeFormModal();
    AlertUtils.showSuccess("Bạn đã hủy lịch thành công")
  }
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

function getOrderByPhone(phone) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/last-order-by-phone?phone=` + phone, resolve, reject);
  });
}

function cancelBooking(id) {
  let body = {
    id: id
  }
  console.log(body)
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/cancel-by-customer`, JSON.stringify(body), resolve, reject);
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
    "brandSeriesId": data["brandSeries"].id,
    "serviceIds": data["serviceIds"],
  }

  if (data["oilIds"]) {
    body["oilIds"] = data["oilIds"]
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders`, JSON.stringify(body), resolve, reject);
  });
}

function updateOrder(data) {
  const body = {
    "id": data["id"],
    "phone": data["phone"],
    "pickUpAddress": data["address"],
    "timeSchedule": data["timeSchedule"],
    "customerNote": data["note"],
    "licensePlate": data["licensePlate"],
    "fullName": data["fullname"],
    "paymentMethod": data["paymentMethod"],
    "brandSeriesId": data["brandSeries"].id,
    "serviceIds": data["serviceIds"],
    "vehicleName": data["vehicleName"],
  }

  if (data["oilIds"]) {
    body["oilIds"] = data["oilIds"]
  }

  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/update-order`, JSON.stringify(body), resolve, reject);
  });
}

function postEstimatePrice(data) {
  const body = {
    serviceIds: data.services.map(service => service.id)
  }
  let oilIds = ServiceModel.getListOil(data);
  if (oilIds) {
    body.oilIds = oilIds;
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/price-calculation`, JSON.stringify(body), resolve, reject);
  }); 
}
