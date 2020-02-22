// countというReducerの定義ファイル。
// Reducerは、以前の状態(Old State)とアクションを組み合わせて、
// 新しい状態(New state)を生み出す。

// importでディレクトリを指定した場合、ディレクトリ配下のindex.jsが指定される模様。
import { INCREMENT, DECREMENT } from '../actions'

// stateの初期値を設定。
const initialState = { value: 0 }

// actionのtypeに応じて処理を分岐。
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1}
    case DECREMENT:
      return { value: state.value - 1}
    default:
      return state
  }
}
