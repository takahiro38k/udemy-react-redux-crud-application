// 取得したデータを配列からオブジェクトに変換して操作しやすいようにするパッケージ。
import _ from 'lodash'
import { READ_EVENTS } from '../actions'

// Reducer
// 1)以前のstate
// 2)action
// 上記2つを組み合わせて，新しい状態を生み出すための関数。
export default (event = {}, action) => {
  // actionのtypeに応じて分岐。
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data); // actionのレスポンスデータを確認。
      // ++++----------------
      // 下記のような配列だとデータをあつかいにくい。
      // 特定のオブジェクトにアクセスするために、フルスキャンが必要になってしまう。
      // [
      //   {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // ]
      // lodashをimportし、下記のようにオブジェクトに変換してあつかいやすくする。
      // {
      //   1: {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
      //   2: {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
      // }
      // ----------------++++
      // lodash.mapKeys()
      // 第2引数に指定したプロパティをkeyとして、オブジェクトに変換する。
      // console.log(_.mapKeys(action.response.data, 'id')); // lodashの確認。
      return _.mapKeys(action.response.data, 'id');
    default:
      return event;
  }
}

