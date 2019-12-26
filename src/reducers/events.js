// 取得したデータを配列からオブジェクトに変換して操作しやすいようにする。
import _ from 'lodash'
import { READ_EVENTS } from '../actions'

export default (event = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // 下記のような配列だとデータをあつかいにくい。
      // [
      //   {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // ]
      // lodashをimportし、下記のようにオブジェクトに変換してあつかいやすくする。
      // {
      //   1: {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   2: {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // }
      return _.mapKeys(action.response.data, 'id')
    default:
      return event
  }
}
