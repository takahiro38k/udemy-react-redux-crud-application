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
// デバッグをしやすくするためのツール
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css';
import reducer from './reducers';
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import registerServiceWorker from './registerServiceWorker';

// アプリケーション内のすべてのstateをstoreで管理する。
// createStoreの第2引数にapplyMiddleware()を入れて、その引数にthunkを入れることで、
// storeの中にthunkを組み込む。
// --------------------
// enhancerはcreateStore()の2nd paraを表す。
// --------------------
// 開発環境の時だけ、composeWithDevTools()でデバッグを行う。
const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

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
      {/* Switchでwrapされた各々のコンポーネントに
        設定されたpathが上から順に評価されて、
        最初にマッチしたコンポーネントのみが
        renderingの対象となる。
        そして、一般的なswitch文の様に、
        上から順に排他的にマッチするものを探します。 */}
      <Switch>
        {/* exactを付けないと、部分一致でも指定のコンポーネントにアクセスできる。
          今回は、動作保証までを目指しているので、上記2つのコンポーネントはexactを外した模様。 */}
        <Route path="/events/new" component={EventsNew} />
        {/* 変数には:を頭につける。今回の場合、idは様々な値が入る。 */}
        <Route path="/events/:id" component={EventsShow} />
        {/* exact は完全な一致のみを適用 */}
        <Route exact path="/" component={EventsIndex} />
        <Route exact path="/events" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
