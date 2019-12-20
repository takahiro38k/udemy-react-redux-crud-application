import React from 'react';

// const App = () => {
//   return (
//     <div>
//       <User name={"Taro"} age={10}/>
//       <User name={"Hanako"} age={5}/>
//     </div>
//   )
// }

// const User = (props) => {
//   return <div>HI, I am {props.name}, and {props.age} years old!</div>
// }

const App = () => {
  const profiles = [
    { name: "Taro", age: 10},
    { name: "Hanako", age: 5},
    { name: "NoName" }
  ]
  return (
    <div>
      {
        // 下記エラーを出さないためにindexを設定。
        // Warning: Each child in a list should have a unique "key" prop.
        profiles.map((profiles, index) => {
          return <User name={profiles.name} age={profiles.age} key={index}/>
        })
      }
    </div>
  )
}

const User = (props) => {
  return <div>HI, I am {props.name}, and {props.age} years old!</div>
}

// デフォルト・プロップス
User.defaultProps = {
  age: 1
}

export default App;
