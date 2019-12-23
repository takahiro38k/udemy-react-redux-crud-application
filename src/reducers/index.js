// Reducerを結合するためにインポート。
import { combineReducers } from 'redux'
import count from './count'

export default combineReducers({ count })
