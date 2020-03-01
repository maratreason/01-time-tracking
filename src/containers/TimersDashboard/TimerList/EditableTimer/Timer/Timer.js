import React, { Component } from "react"

import TimerActionButton from "./TimerActionButton"
import { renderElapsedString } from "../../../../../utils"

class Timer extends Component {
  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStartTimer = () => {
    const { onStartTimerHandle, id } = this.props

    this.timerId = setInterval(() => {
      this.forceUpdate()
    }, 1000)

    onStartTimerHandle(id)
  }

  onStopTimer = () => {
    const { id, onStopTimerHandle } = this.props
    onStopTimerHandle(id)
  }

  render() {
    const {
      elapsed,
      runningSince,
      title,
      project,
      id,
      onOpenEditForm,
      onRemoveTimerHandle,
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
              <i
                className="trash icon"
                onClick={() => onRemoveTimerHandle(id)}
              />
            </span>
          </div>
        </div>
        <TimerActionButton
          runningSince={runningSince}
          onStartTimerHandle={() => {
            this.onStartTimer()
          }}
          onStopTimerHandle={() => {
            this.onStopTimer()
          }}
        />
      </div>
    )
  }
}

export default Timer
