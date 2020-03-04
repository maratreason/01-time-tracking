import React, { Component } from "react"

import TimerActionButton from "./TimerActionButton"
import { renderElapsedString } from "../../../../../utils"

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { a: 1 }
    console.log("timer construcctor")
  }

  static getDerivedStateFromProps() {
    console.log("timer getDerivedStateFromProps")
    return null
  }

  shouldComponentUpdate(nextProps, nextState, snapShot) {
    console.log("timer should component update")
    return false
  }

  componentDidMount() {
    console.log("timer did mount")
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStartTimerHandle = () => {
    const { startTimer, id } = this.props

    this.timerId = setInterval(() => {
      this.forceUpdate()
    }, 1000)

    startTimer(id)
  }

  onStopTimerHandle = () => {
    const { id, stopTimer } = this.props
    clearInterval(this.timerId)
    stopTimer(id)
  }

  render() {
    console.log("timer render")

    const {
      id,
      title,
      project,
      elapsed,
      runningSince,
      onOpenEditForm,
      removeTimer,
    } = this.props
    const elapsedString = renderElapsedString(elapsed, runningSince)

    console.log("runningSince", runningSince)

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{title}</div>
          <div className="meta">{project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span className="right floated edit icon">
              <i className="edit icon" onClick={() => onOpenEditForm()} />
            </span>
            <span className="right floated trash icon">
              <i className="trash icon" onClick={() => removeTimer(id)} />
            </span>
          </div>
        </div>
        <TimerActionButton
          runningSince={runningSince}
          onStartTimerHandle={this.onStartTimerHandle}
          onStopTimerHandle={this.onStopTimerHandle}
        />
      </div>
    )
  }
}

export default Timer
