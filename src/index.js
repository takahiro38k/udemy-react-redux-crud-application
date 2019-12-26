import React from 'react';
import ReactDOM from 'react-dom';
// storeを作成するための関数、およびミドルウェアを扱うための関数。
import { createStore, applyMiddleware } from 'redux';
// 作成したstoreを全コンポーネントに渡す機能を持つ特殊なコンポーネント。
import { Provider } from 'react-redux';
// 非同期処理を実装するためのパッケージ。ミドルウェア。
// actionの代わりに関数を返すことができる。
import thunk from 'redux-thunk';

import './index.css';
import reducer from './reducers';
// コードを見やすいよう、フォルダを作成して移動。
import EventsIndex from './components/events_index';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <EventsIndex />
  </Provider>,
  document.getElementById('root')
);
  registerServiceWorker();
