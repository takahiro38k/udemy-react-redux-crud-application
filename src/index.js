import React from 'react';
import ReactDOM from 'react-dom';
// storeを作成するための関数。
import { createStore } from 'redux';
// 作成したstoreを全コンポーネントに渡す機能を持つ特殊なコンポーネント。
import { Provider } from 'react-redux';

import './index.css';
// importでディレクトリを指定した場合、ディレクトリ配下のindex.jsが指定される模様。
import reducer from './reducers';
// コードを見やすいよう、コンポーネントもsrc直下に配置せず、
// componentsディレクトリを作成してそこからimportする。。
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// アプリケーション内のすべてのstateをstoreで管理する。
const store = createStore(reducer)

// Reactのみの実装だと、propsのバケツリレー(親 => 子 => 孫 => ...)が必要だった。
// それを解消するのがReduxのstore。
// 下記のようにProviderコンポーネントにstore属性を渡すことで、
// すべてのcomponetがstoreにアクセスできる。
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
  registerServiceWorker();

