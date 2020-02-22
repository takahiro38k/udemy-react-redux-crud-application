// Actionの実装

// Reducerでも利用するためexport
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

// 下記のincrement, decrementのように、
// Actionを返す関数のことをAction Creatorという。
export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})
　
