import React from 'react';
import ReactDOM from 'react-dom';
// storeを作成するための関数、およびミドルウェア(今回の場合thunk)を適用するための関数。
import { createStore, applyMiddleware } from 'redux';
// 作成したstoreを全コンポーネントに渡す機能を持つ特殊なコンポーネント。
import { Provider } from 'react-redux';
// 非同期処理を実装するためのパッケージ。ミドルウェア。
// action creatorは本来action(type要素を持つオブジェクト)を返さなければならないが、
// thunkを使うとactionの代わりに関数を返すことができる。
import thunk from 'redux-thunk';
// リンクの実装に必要なコンポーネントをまとめてimport
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './index.css';
import reducer from './reducers';
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import registerServiceWorker from './registerServiceWorker';

// アプリケーション内のすべてのstateをstoreで管理する。
// createStoreの第2引数にapplyMiddleware()を入れて、その引数にthunkを入れることで、
// storeの中にthunkを組み込む。
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  // Reactのみの実装だと、propsのバケツリレー(親 => 子 => 孫 => ...)が必要だった。
  // それを解消するのがReduxのstore。
  // 下記のようにProviderコンポーネントにstore属性を渡すことで、
  // すべてのcomponetがstoreにアクセスできる。
  <Provider store={store}>
    {/*
    Linkコンポーネント(./components/配下で使用)は、
    Routeコンポーネントでラップしないと下記エラーとなる。
    Error: Invariant failed: You should not use <Link> outside a <Router>
    そのRouteコンポーネントをSwitchコンポーネントでラップし、
    さらにBrowserRouterコンポーネントでラップして使用する。
     */}
    <BrowserRouter>
      <Switch>
        <Route exact path="/events/new" component={EventsNew} />
        <Route exact path="/" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
