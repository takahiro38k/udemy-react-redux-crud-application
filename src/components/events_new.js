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

import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

  async onSubmit(values) {
    await this.props.postEvent(values)
    // トップページの履歴をプッシュ
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

        {/* <div>
          // Submitポタン
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          // Cancelポタン
          <Link to="/" >Cancel</Link>
        </div> */}
        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid}/>
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
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

// この画面ではイベントのstateを描画することはないので、
// mapStateToProps は不要。

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
const mapDispatchToProps = ({ postEvent })

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
export default connect(null, mapDispatchToProps)(
  // Fieldコンポーネントは、reduxForm()関数でdecorateされたコンポーネントの
  // 内部に存在しないといけない。
  // --------------------
  // 今回の場合、EventsNewコンポーネントをreduxForm()でdecorateする。
  // 具体的には、reduxForm()が返す関数の引数にEventsNewを設定する。
  // よって reduxForm()(EventsNew) となる。
  // --------------------
  // reduxForm()の引数には、validationのルールや、
  // フォームのユニークな名前を、オブジェクトで指定する。
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
