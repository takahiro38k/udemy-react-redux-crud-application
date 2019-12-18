import React, { Component } from 'react';

// class App extends Component {
//   render() {
//     return <div>Hello, world!</div>
//   }
// }
class App extends Component {
  render() {
    // const greeting = "Hi, Tom!"
    // // javascriptの予約ごとかぶるので、classではなくclassNameとする。
    // // 変数は｛｝で囲む。　※波括弧の中にjavascriptを記述できるということ。
    // const dom = <h1 className="foo">{greeting}</h1>
    // return dom;

    // // 属性の書き方。｛｝の中にjavascriptを記述。
    // return <input type="text" onClick={() => {console.log("I am clicked.")}} />;

    // タグのforはhtmlForと書く。
    // Reactの制約：　returnで返すJSXは1つのタグでなければならない。
    // 複数のタグを囲む場合、React.Fragmentを使うと余計なタグを作らずに済む。
    return (
      <React.Fragment>
        <label htmlFor="bar">bar</label>
        <input type="text" onChange={() => {console.log("I am clicked.")}} />
      </React.Fragment>
    )
  }
}
export default App;
