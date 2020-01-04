import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// import { postEvent } from '../actions'

// コンポーネントは1つだけなのでCounterをリネーム。
class EventsNew extends Component {
  render() {
    return (
      <React.Fragment>
        <div>foo</div>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = ({ readEvents })

// 【重要】stateとactionをコンポーネントに結びつける。
export default connect(null, null)(EventsNew)
