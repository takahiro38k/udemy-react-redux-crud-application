// 取得したデータを配列からオブジェクトに変換して操作しやすいようにするパッケージ。
import _ from 'lodash'
// actionオブジェクトのtypeを../actions/index.jsからimport
import {
  READ_EVENTS,
  DELETE_EVENT,
} from '../actions'

// Reducer
// 1)現状のstate　※今回の場合でいうと、引数event。
// 2)action
// 上記2つを組み合わせて，新しい状態を生み出すための関数。
// よって、どのactionも return で必ず新しい状態を返すようにする。
export default (events = {}, action) => {
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
    case DELETE_EVENT:
      delete events[action.id]
      // reduxの原則に則り、stateを変更した場合は
      // Object.assign() または object spread syntax(...)
      // によってstateをreturnする。
      // 今回は短く書ける object spread syntax(...) を採用。
      // https://redux.js.org/recipes/using-object-spread-operator
      return { ...events }
    default:
      return events;
  }
}

