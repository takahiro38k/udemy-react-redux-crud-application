// 新規イベントの入力画面

import React, { Component } from 'react';
import { connect } from 'react-redux';
// FieldコンポーネントとreduxFormをimportし、Redux-Formを実装する。
// Redux-Formの導入手順は下記。
// https://redux-form.com/8.3.0/docs/gettingstarted.md/
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {
  constructor(props) {
    // console.log("EventsShow") // レンダリング確認
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  // 直接URLに/event/<id>を入力した場合でも、
  // フォームに既存の値を表示するよう設定。
  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  // field引数は、下記のrender()にあるFieldコンポーネントに入力される値。
  // fieldから様々な情報を取得できる。
  renderField(field) {
    // input   入力値そのもの
    // touched   フォームをフォーカスし、そのフォーカスを外すとtrueになる。
    //           デフォルトはfalse
    // error   validationメッセージそのもの
    // --------------------
    // meta情報はFieldコンポーネントのcomponentという属性に渡している
    // 関数の引数に渡ってくるもの。Redux-Form特有の属性。
    // --------------------
    // 詳細は下記のFieldコンポーネントのマニュアルに記載
    // https://redux-form.com/8.3.0/docs/api/field.md/
    const { input, label, type, meta: {touched, error } }  = field

    // 入力フォーム
    return (
      /*
      <div>
        <input {...input} placeholder={label} type={type} />
        // validationのメッセージを表示
        // タッチした状態、かつエラーがある場合、エラー内容を表示
        {touched && error && <span>{error}</span>}
      </div>
       */
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDelete() {
    // matchはreact routerの機能によって作成されるオブジェクト
    // console.log(this.props.match.params) // 出か確認
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    // this.props.history.push()
    // react-router-domによる画面遷移。前居た画面を履歴に追加し、
    // ブラウザの戻るボタンで戻れるようにする(React Router で標準的な挙動)。
    this.props.history.push('/')
  }

  render() {
    // あらかじめ提供されているパラメータ。
    // ++++----------------
    // pristine      何も入力されていない状態だとtrue。
    // subumitting   Submitボタンを1度押すとtrue。ボタンの連打抑止に使える。
    // invalid       validationエラーが表示されたらtrue。
    //
    // or条件(||)でSubmitボタンのdisabled属性に設定し、ボタンを非活性にする。
    // ----------------++++
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 18 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {/* Titleの入力フォーム */}
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        {/* Bodyの入力フォーム */}
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

        <div>
          {/* // Submitポタン
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          // Cancelポタン
          <Link to="/" >Cancel</Link>
          <Link to="/" onClick={this.onDelete} >Delete</Link> */}
          <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid}/>
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
          <RaisedButton label="Delete" style={style} onClick={this.onDelete}/>
        </div>
      </form>
    )
  }
}

// validationの定義(エラーの管理)
// values引数には入力値が渡ってくる。
const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

// mapStateToProps
// Storeからコンポーネントに必要なstateを取り出し、
// コンポーネント内にpropsとしてマッピングするための関数。
// 引数のstateは、状態のトップレベルを指すことに注意。
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

// mapDispatchToProps
// dispatch()関数を引数に取り、状態遷移を行う関数(どのように
// propsに混ぜ込むかを決める)。
// dispatch()関数は、actionの発生時に、typeに応じた状態遷移をReducerに実行させる。
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const mapDispatchToProps = dispatch => ({
//   postEvent: () => dispatch(postEvent()),
// })
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 上記Dispatchのショートハンドが下記。
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

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
// --------------------
export default connect(mapStateToProps, mapDispatchToProps)(
  // Fieldコンポーネントは、reduxForm()関数でdecorateされたコンポーネントの
  // 内部に存在しないといけない。
  // --------------------
  // 今回の場合、EventsNewコンポーネントをreduxForm()でdecorateする。
  // 具体的には、reduxForm()が返す関数の引数にEventsNewを設定する。
  // よって reduxForm()(EventsShow) となる。
  // --------------------
  // reduxForm()の引数には、validationのルールや、
  // フォームのユニークな名前を、オブジェクトで指定する。
  // --------------------
  // enableReinitialize:
  // デフォルトはfalse。trueを設定するとinitialValuesプロパティ
  // (mapStateToPropsの返り値)が変更されるたびに
  // フォームが再初期化される。
  // 今回の場合、フォームに既存の値を表示するために必要。
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow) )
