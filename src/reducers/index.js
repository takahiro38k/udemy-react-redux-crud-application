// このファイルは全Reducerをまとめるためのもの。

// 全Reducerを1つに結合するための関数をimport。
import { combineReducers } from 'redux'
// stateを持つcountというReducerをimport
import count from './count'

// storeを作成するためにexport。
// 今回はReducerが1つだけだが、複数ある場合は{}内で「,」区切りで列挙可能。
// 例:
// combineReducers({ reducer1, reducer2, reducer3 })
export default combineReducers({ count })
