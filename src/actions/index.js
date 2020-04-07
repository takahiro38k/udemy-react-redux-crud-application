// axios:
// HTTP通信を簡単に行うことができるJavascriptライブラリ。
// 外部のAPIサーバにリクエストを投げるhttpクライアント
// 返り値はPromise。
import axios from 'axios'
export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

// CRUDの処理内容に関わらず共通して使用するURL
const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

// Action
// オブジェクト。type(keyの役割)と値のセット。値はなくても可。
// typeはconst(定数)で大文字とすることが多い。
// Store内のStateを更新するためにはActionを発行する必要がある。
// --------------------
// Action Creator
// Actionを返す関数のこと。下記 readEvents(), postEvent()。
// --------------------
// thunk
// 導入(src/index.js)したことで、Action creator(readEvents)が
// オブジェクト(Action)ではなく関数(async dispatch)を返すことができる。
// つまり
// const actionCreator = () => {}    こうだったのが
// const actionCreator = () => () => {}    こう書けるようになる。
// --------------------
// dispatch
// Reducer にアクションを通知する関数。
// 単語としてのの意味は、派遣する、送る、など。
// --------------------
// イベントの一覧を表示するためのAction Creater
export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  // console.log(response); // 取得データを確認。
  // dispatch(Action)を実行することでReducerが実行される。
  dispatch({ type: READ_EVENTS, response });
}

// 新規イベントを登録するためのAction Creater
export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response });
}

// 既存イベントを更新する。
export const putEvent = values => async dispatch => {
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
  // console.log(response) //HTTPレスポンスの確認
  dispatch({ type: UPDATE_EVENT, response })
}

// 既存イベントの編集画面を直接URLから開いた時、既存の値をフォームに表示する。
export const getEvent = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  // console.log(response) //HTTPレスポンスの確認
  dispatch({ type: READ_EVENT, response })
}

// イベントを削除するためのAction Creater
export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({ type: DELETE_EVENT, id });
}


