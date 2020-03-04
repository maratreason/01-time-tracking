import React, { Component } from "react"

import TimerActionButton from "./TimerActionButton"
import { renderElapsedString } from "../../../../../utils"

// there is a bug, when you click edit button and then cancel or update,
// timer stop working correctly
class Timer extends Component {
  componentDidMount() {
    const { runningSince } = this.props
    this.startSetTimeout(runningSince)
  }

  componentDidUpdate() {
    const { runningSince } = this.props
    if (runningSince) {
      this.startSetTimeout(runningSince)
    } else {
      clearInterval(this.timerId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStartTimerHandle = () => {
    const { startTimer, id } = this.props
    startTimer(id)
  }

  onStopTimerHandle = () => {
    const { id, stopTimer } = this.props
    stopTimer(id)
  }

  startSetTimeout(runningSince) {
    if (runningSince) {
      this.timerId = setTimeout(() => {
        clearInterval(this.timerId)
        this.forceUpdate()
      }, 1000)
    }
  }

  render() {
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
          onStartTimerHandle={() => {
            this.onStartTimerHandle()
          }}
          onStopTimerHandle={() => {
            this.onStopTimerHandle()
          }}
        />
      </div>
    )
  }
}

export default Timer
