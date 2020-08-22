import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'

export default function* app() {
  yield takeLatest(type.APP.GET_INFO_BOOKING_ASYNC, requestGetInfoBookingAsync)
  yield takeLatest(type.APP.BOOKING_ASYNC, requestBookingAsync)
}

function* requestGetInfoBookingAsync() {
  const resp = yield call(getInfoBooking)
  yield put({ type: type.APP.GET_INFO_BOOKING_END, payload: resp})
}

function getInfoBooking() {
  return new Promise(resolve => {
    
  });
}

function* requestBookingAsync() {
  const resp = yield call(booking);
  yield put({ type: type.APP.BOOKING_END, payload: resp})
}
