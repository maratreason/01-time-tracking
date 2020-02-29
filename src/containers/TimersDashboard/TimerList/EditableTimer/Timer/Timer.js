import React, { Component } from "react"

import TimerActionButton from "./TimerActionButton"
import { renderElapsedString } from "../../../../../utils"

class Timer extends Component {
  state = {
    timer: this.props,
    timerIsRunning: false
  }

  onStartTimer = () => {
    const date = Date.now()
    const { onStartTimerHandle, onEditTimer } = this.props
    const { timer } = this.state

    this.timer = setInterval(() => {
      this.setState({
        timer: {
          ...timer,
          runningSince: date
        },
        timerIsRunning: true
      })
    }, 1000)

    onStartTimerHandle(timer.id, timer.runningSince)
  }

  onStopTimer = () => {
    const { onStopTimerHandle } = this.props
    this.setState({
      timerIsRunning: false
    })

    onStopTimerHandle(this.timer)
  }

  render() {
    const { elapsed, runningSince, title, project, id } = this.state.timer
    const elapsedString = renderElapsedString(elapsed, runningSince)

    return (
      <div className='ui centered card'>

        <div className='content'>
          <div className='header'>{title}</div>
          <div className='meta'>{project}</div>
          <div className='center aligned description'>
            <h2>{elapsedString}</h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'

            >
              <i className='edit icon' onClick={() => this.props.onOpenEditForm()} />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' onClick={() => this.props.onRemoveTimerHandle(id) } />
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={this.state.timerIsRunning}
          onStartTimerHandle={() => {this.onStartTimer()} }
          onStopTimerHandle={() => {this.onStopTimer() } }
        />
      </div>
    )
  }
}

export default Timer
