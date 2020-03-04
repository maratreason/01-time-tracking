import React, { Component } from "react"

import {
  getTimers,
  createTimer,
  updateTimer,
  deleteTimer,
  startTimer,
  stopTimer,
} from "../../api"

import TimerList from "./TimerList/TimerList"
import ToggleableTimerForm from "./ToggleableTimerForm/ToggleableTimerForm"

class TimersDashboard extends Component {
  state = {
    timers: [],
    isOpen: false,
  }

  componentDidMount() {
    getTimers().then(response => {
      this.setState({ timers: response })
    })
  }

  addTimer = inputValues => {
    const { timers } = this.state

    const id = timers.length + 1
    const newTimer = {
      ...inputValues,
      id,
      elapsed: 0,
      runningSince: null,
    }

    createTimer({ ...newTimer }).then(response => {
      this.setState({ timers: response })
    })
  }

  updateTimer = (id, formData) => {
    const { timers } = this.state

    timers.map(timer => {
      let updatedTimer = {}

      if (timer.id === id) {
        updatedTimer = {
          ...timer,
          title: formData.title,
          project: formData.project,
        }
      }

      updateTimer(updatedTimer)
      return timer
    })
  }

  removeTimer = id => {
    const { timers } = this.state

    timers.map(timer => {
      if (timer.id !== id) {
        deleteTimer(timer)
      }

      return timer
    })
  }

  startTimer = id => {
    const { timers } = this.state

    timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          runningSince: Date.now(),
        }
      }
      startTimer(timer)

      return timer
    })
  }

  stopTimer = id => {
    const { timers } = this.state

    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        timer.elapsed = timer.elapsed + Date.now() - timer.runningSince
        timer.runningSince = null
      }
      stopTimer(timer)

      return timer
    })

    this.setState({ timers: updatedTimers })
  }

  render() {
    const { timers, isOpen } = this.state

    return (
      <div className="ui three column centered grid" style={{ width: "100%" }}>
        <div className="column">
          <TimerList
            timers={timers}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            removeTimer={this.removeTimer}
            updateTimer={this.updateTimer}
          />
          <ToggleableTimerForm isOpen={isOpen} addTimer={this.addTimer} />
        </div>
      </div>
    )
  }
}

export default TimersDashboard
