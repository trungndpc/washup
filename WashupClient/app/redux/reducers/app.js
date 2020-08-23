import * as type from '../actions/action-types'
import AlertUtils from '../../utils/AlertUtils';

const initialState = {
  models: {},
  schedules: {},
  services: [],
  inforBooking: {},
  isLoadingBooking: false,
  confirmBooking: null
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.GET_MODELS_END: {
      let resp = action.payload;
      newState.models = classifyModels(resp.data);
      break
    }
    case type.APP.GET_SCHEDULE_TODAY_END: {
      let resp = action.payload;
      resp.data.sort(function (a, b) {
        return a["time"] - b["time"];
      });
      newState.schedules[1] = resp.data;
      break;
    }
    case type.APP.GET_SERVICE_END: {
      let resp = action.payload;
      newState.services = resp.data;
      break;
    }
    case type.APP.PUT_INFO_BOOKING: {
      let data = action.data;
      newState.inforBooking = data;
      break;
    }
    case type.APP.BOOKING_START: {
      newState.isLoadingBooking = true;
      break;
    }
    case type.APP.BOOKING_END: {
      newState.isLoadingBooking = false;
      if (action.payload.data.id) {
        AlertUtils.showSuccess("Bạn đã booking thành công!")
        newState.confirmBooking = action.payload.data;
        newState.inforBooking = null;
      }
      break;
    }
    default:
      return state
  }
  return newState
}


function classifyModels(arr) {
  var model = {};
  arr.forEach(function (item) {
    let cate = item["category"]
    let lstModel = model[cate];
    if (!lstModel) {
      lstModel = [];
    }
    lstModel.push(item)
    model[cate] = lstModel
  });
  return model;
}
