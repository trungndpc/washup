import * as type from '../actions/action-types'

const initialState = {
  user: [],
  isLoading: false
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.GET_LIST_ITEM_START: {
      newState.isLoading = true
      newState.user = []
      break
    }
    case type.APP.GET_LIST_ITEM_END: {
      newState.user = action.payload
      newState.isLoading = false
      break
    }
    default:
      return state
  }
  return newState
}
