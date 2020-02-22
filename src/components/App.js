import React, { Component } from 'react';
// connect関数をimport
import { connect } from 'react-redux';

// exportしたAction Creatorをimport
import { increment, decrement } from '../actions'

// コンポーネントは1つだけなのでCounterをリネーム。
class App extends Component {
  // stateはReducerで初期化するのでconstructorは不要。
  // constructor(props) {
  //   super(props)
  //   console.log(this.state)
  //   this.state = { count: 0 }
  // }

  // Action Createrで処理するのでPlus処理・Minus処理は不要。
  // handlePlusButton = () => {
  //   // stateの変更はsetStateを使う。
  //   this.setState({ count: this.state.count + 1})
  // }

  // handleMinusButton = () => {
  //   this.setState({ count: this.state.count - 1})
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
      <div>value: { props.value }</div>
      <button onClick={props.increment}>+1</button>
      <button onClick={props.decrement}>-1</button>
    </React.Fragment>
    )
  }
}

// mapStateToPropsは、stateからコンポーネントに必要なデータを取り出し、
// コンポーネント内にpropsとしてマッピングする。
// 引数のstateは、状態のトップレベルを指す。
const mapStateToProps = state => ({ value: state.count.value})

// mapDispatchToPropsは、dispatch()関数を引数に取り、状態遷移を行う。
// dispatch()関数は、actionの発生時に、typeに応じた状態遷移をReducerに実行させる。
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement())
// })
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 上記Dispatchのショートハンドが下記。
const mapDispatchToProps = ({ increment, decrement })

// stateとactionをコンポーネントに結びつける。
export default connect(mapStateToProps, mapDispatchToProps)(App)
