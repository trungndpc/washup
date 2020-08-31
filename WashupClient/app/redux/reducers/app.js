import * as type from '../actions/action-types'
import AlertUtils from '../../utils/AlertUtils';

const initialState = {
  models: {},
  brands: [],
  schedules: {},
  services: {},
  inforBooking: {},
  isLoadingBooking: false,
  confirmBooking: null,
  topAccessories: []
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.GET_MODELS_END: {
      let resp = action.payload;
      newState.models = classifyModels(resp.data);
      break
    }
    case type.APP.GET_BRAND_END: {
      newState.brands = action.payload;
      break
    }
    case type.APP.GET_SCHEDULE_TODAY_END: {
      let today = action.today;
      let tomorow = action.tomorow;
      let schedules = { ...newState.schedules }
      schedules[1] = today;
      schedules[2] = tomorow;
      newState.schedules = schedules;
      break;
    }
    case type.APP.GET_SERVICE_END: {
      let transportId = action.transportId;
      let serviceId = action.serviceId;
      let services = { ...newState.services };
      let serviceByTrans = services[transportId] ? { ...services[transportId] } : {}
      serviceByTrans[serviceId] = action.data;
      services[transportId] = serviceByTrans
      newState.services = services;
      break;
    }
    case type.APP.PUT_INFO_BOOKING: {
      let data = action.data;
      newState.inforBooking = data;
      newState.confirmBooking = null;
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
    case type.APP.GET_ACCESSORIES_END: {
        newState.topAccessories = action.payload;
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
