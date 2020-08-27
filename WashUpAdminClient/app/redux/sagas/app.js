import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'

export default function* app() {
  yield takeLatest(type.APP.GET_LIST_BOOKING_ASYNC, requestGetListBookingByDateAsync)
  yield takeLatest(type.APP.GET_BOOKING_DETAIL_ASYNC, requestGetBookingDetailById)
}

function* requestGetListBookingByDateAsync(action) {

  const data = yield call(getListBookingByDate, action.datetime)
  yield put({ type: type.APP.GET_LIST_BOOKING_END, payload: data })
}

function* requestGetBookingDetailById(action) {
  const resp = yield call(getBookingDetail, action.id);
  yield put({ type: type.APP.GET_BOOKING_DETAIL_END, payload: resp.data })
}

function getListBookingByDate(datetime) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/all`, resolve, reject);
  });
}


function getBookingDetail(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/orders/` + id, resolve, reject);
  });
}
