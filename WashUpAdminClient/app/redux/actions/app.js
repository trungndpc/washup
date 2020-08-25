/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function listItem() {
  return {
    type: type.APP.GET_LIST_ITEM_ASYNC
  }
}
