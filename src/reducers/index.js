// 全Reducerを1つに結合するための関数をimport。
import { combineReducers } from 'redux'
// Redux-Formを使用しているので、Redux-Formの提供するreducerもimport。
// reducerだとあまりに一般的な名称なので、わかりやすのformに変更。
import { reducer as form } from 'redux-form'
// stateを持つcountというReducerをimport
import events from './events'

// storeを作成するためにexport。
// Reducerが複数ある場合は{}内で,区切りで列挙可能。
export default combineReducers({ events, form })
