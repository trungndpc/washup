import * as type from '../actions/action-types'
import AlertUtils from '../../utils/AlertUtils';

const initialState = {
  models: {},
  brands: {},
  brandSeries: {},

  storeServices: {},

  schedules: {},
  services: {},
  inforBooking: {},
  serviceForm: [],
  isLoadingBooking: false,
  confirmBooking: null,
  topAccessories: [],
  accessories: {},
  activities: [],
  oils: [],
  isOpenSearchPhone: false,
  modeBookingModel: 0,
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
      let today = action.today;
      let tomorow = action.tomorow;
      let overTomorow = action.overTomorow;
      let schedules = { ...newState.schedules }
      schedules[1] = today;
      schedules[2] = tomorow;
      schedules[3] = overTomorow;
      newState.schedules = schedules;
      break;
    }
    case type.APP.GET_HOME_SERVICE_END: {
      let transportId = action.transportId;
      let serviceId = action.serviceId;
      let services = { ...newState.services };
      let serviceByTrans = services[transportId] ? { ...services[transportId] } : {}
      serviceByTrans[serviceId] = action.data;
      services[transportId] = serviceByTrans
      newState.services = services;
      break;
    }
    case type.APP.GET_SERVICE_END: {
      newState.serviceForm = action.payload;
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
      let payload = action.payload;
      if (payload.errors && payload.errors[0]) {
        AlertUtils.showError(payload.errors[0].errorMsg)
      } else {
        if (payload.data.id) {
          AlertUtils.showSuccess("Bạn đã booking thành công!")
          newState.confirmBooking = payload.data;
          newState.inforBooking = null;
        }
      }

      break;
    }
    case type.APP.UPDATE_ORDER_END: {
      newState.isLoadingBooking = false;
      let payload = action.payload;
      if (payload.errors && payload.errors[0]) {
        AlertUtils.showError(payload.errors[0].errorMsg)
      } else {
        AlertUtils.showSuccess("Cập nhật thành công!")
        newState.confirmBooking = payload.data;
        newState.inforBooking = null;
      }
      break;
    }
    case type.APP.GET_ACCESSORIES_END: {
      newState.topAccessories = action.payload;
      break;
    }
    case type.APP.GET_SLICE_ACCESSORIES_END: {
      newState.accessories = action.payload;
      break;
    }
    case type.APP.GET_ACTIVITY_TOP_END: {
      newState.activities = action.payload;
      break;
    }
    case type.APP.GET_OIL_END: {
      newState.oils = action.payload;
      break;
    }
    case type.APP.GET_HOME_INFO_END: {
      const data = action.payload;
      newState.brands = data["brands"]
      newState.brandSeries = data["brandSeries"]
      newState.storeServices = data["services"]
      break;
    }
    case type.APP.CHANGE_STATUS_SEARCH_PHONE_MODAL: {
      newState.isOpenSearchPhone = action.status;
      break;
    }
    case type.APP.CHANGE_MODE_BOOKING_MODAL: {
      newState.modeBookingModel = action.mode;
      break;
    }
    case type.APP.GET_ORDER_BY_PHONE_END: {
      let payload = action.payload;
      if (payload.error < 0) {
        let msg = payload.errMsg;
        newState.findOrderByPhonerErrorMSG = msg;
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
