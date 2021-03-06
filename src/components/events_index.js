// イベント一覧の表示画面

import React, { Component } from 'react';
// connect()()
// mapStateToProps と mapDispatchToProps をコンポーネントに結びつける関数。
import { connect } from 'react-redux';
import _ from 'lodash'
// リンクを実装するコンポーネント
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
// 新規作成ボタン用
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

// フォルダ名指定のimportは、自動的にindex.jsを参照する。
import { readEvents } from '../actions'

class EventsIndex extends Component {
  // コンポーネントがマウントされた時に実行されるメソッド。
  componentDidMount() {
    // readEvents 外部サーバから一覧を取得する
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      // <tr key={event.id}>
      <TableRow key={event.id}>
        {/* <td>{event.id}</td>
        <td>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td> */}
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          {/* 選んだtitleに応じてリンクを動的に決める。 */}
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      {/* </tr> */}
      </TableRow>
    ))
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    }
    return (
      <React.Fragment>
        {/* 新規イベント作成ボタン */}
        {/* 上記styleの適用によって、ボタンを画面左下に表示 */}
        <FloatingActionButton style={style} containerElement={<Link to="/events/new" />}>
          {/* ボタンに+を表示 */}
          <ContentAdd />
        </FloatingActionButton>

        {/* <table> */}
        <Table>
          {/* <thead> */}
          {/* displaySelectAll   falseで全選択のチェックボックスを非表示
              adjustForCheckbox   falseで全選択のチェックボックス部分を詰めて表示*/}
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            {/* <tr> */}
            <TableRow>
              {/* <th>ID</th>
              <th>Title</th>
              <th>Body</th> */}
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
            {/* </tr> */}
            </TableRow>
          {/* </thead> */}
          </TableHeader>

          {/* <tbody> */}
          {/* displayRowCheckbox   falseでチェックボックスを非表示 */}
          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          {/* </tbody> */}
          </TableBody>
        {/* </table> */}
        </Table>

        {/* Material-ui導入のため、return直後の
          FloatingActionButtonのほうで実装。 */}
        {/* <Link to="/events/new">New Event</Link> */}
      </React.Fragment>

    )

  }
}

// mapStateToProps
// Storeからコンポーネントに必要なstateを取り出し、
// コンポーネント内にpropsとしてマッピングするための関数。
// 引数のstateは、状態のトップレベルを指すことに注意。
const mapStateToProps = state => ({ events: state.events})

// mapDispatchToProps
// dispatch()関数を引数に取り、状態遷移を行う関数(どのように
// propsに混ぜ込むかを決める)。
// --------------------
// dispatch()関数
// actionの発生時に、typeに応じた状態遷移をReducerに実行させる。
// ++++----------------
// const mapDispatchToProps = dispatch => ({
//   readEvents: () => dispatch(readEvents()),
// })
// ----------------++++
// 以下、上記Dispatchのショートハンド。
const mapDispatchToProps = ({ readEvents })

// connect()()
// stateとdispatch(actionの送信)が混ぜ込まれたpropsを、
// コンポーネントに結びつける。
// connect(mapStateToProps, mapDispatchToProps)(コンポーネント名)
// --------------------
// function()()
// 高階関数(Higher Order Function)。
// 関数を呼び出す関数のこと。自身の引数と、呼び出す関数の引数が連なるため、
// こうした表記となる。
/*
例:
const fnc1 = x => {
  const fnc2 = y => {
    console.log(x + y)
  }
  return fnc2
}
fnc1('a')('b') //  => 'ab'
 */
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)

