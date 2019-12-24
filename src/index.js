import React from 'react';
import ReactDOM from 'react-dom';
// storeを作成するための関数。
import { createStore } from 'redux';
// 作成したstoreを全コンポーネントに渡す機能を持つ特殊なコンポーネント。
import { Provider } from 'react-redux';

import './index.css';
import reducer from './reducers';
// コードを見やすいよう、フォルダを作成して移動。
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
  registerServiceWorker();
