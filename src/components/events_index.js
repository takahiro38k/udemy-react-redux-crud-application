import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import { readEvents } from '../actions'

// コンポーネントは1つだけなのでCounterをリネーム。
class EventsIndex extends Component {
  componentDidMount() {
    // readEvents 外部サーバから一覧を取得する
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>

        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
    )

  }
}

const mapStateToProps = state => ({ events: state.events})

const mapDispatchToProps = ({ readEvents })

// 【重要】stateとactionをコンポーネントに結びつける。
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
