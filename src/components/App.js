import React, { Component } from 'react';
// connect関数をimport
import { connect } from 'react-redux';

// exportしたインクリ・デクリ関数をimport
import { increment, decrement } from '../actions'

// コンポーネントは1つだけなのでCounterをリネーム。
class App extends Component {
  // Reducerで初期化するのでconstructorは不要。
  // constructor(props) {
  //   super(props)
  //   console.log(this.state)
  //   this.state = { count: 0 }
  // }

  // action createrで処理するのでPlus処理・Minus処理は不要。
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

const mapStateToProps = state => ({ value: state.count.value})

// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement())
// })

// 上記Dispatchのショートハンド
const mapDispatchToProps = ({ increment, decrement })

// 【重要】stateとactionをコンポーネントに結びつける。
export default connect(mapStateToProps, mapDispatchToProps)(App)
