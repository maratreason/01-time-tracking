import React, { Component } from "react"
import update from "immutability-helper"

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
    // loading: false,
  }

  componentDidUpdate() {
    console.log("Dashboard did update")
  }

  componentDidMount() {
    console.log("Dashboard did mount")
    // this.setState({ loading: true })
    getTimers(response => {
      console.log(response)
      this.setState({ timers: response })
    })
  }

  addTimer = inputValues => {
    const { timers } = this.state

    const id = Math.random() * 1000
    const newTimer = {
      ...inputValues,
      id,
      elapsed: 0,
      runningSince: null,
    }

    this.setState({ timers: [...timers, newTimer] })
    createTimer(newTimer)
  }

  updateTimer = (id, formData) => {
    const { timers } = this.state

    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          title: formData.title,
          project: formData.project,
        }
      }

      return timer
    })

    this.setState({ timers: updatedTimers })
    updateTimer({ ...formData, id })
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

    const updatedTimers = timers.map(timer => {
      console.log("start timer", timer)
      if (timer.id === id) {
        return {
          ...timer,
          runningSince: Date.now(),
        }
      }

      return timer
    })

    this.setState({ timers: updatedTimers })
  }

  stopTimer = id => {
    console.log("id", id)
    const { timers } = this.state

    const updatedTimers = timers.map(timer => {
      console.log("stop timer", timer)
      if (timer.id === id) {
        return {
          ...timer,
          elapsed: timer.elapsed + Date.now() - timer.runningSince,
          runningSince: null,
        }
        // timer.elapsed = timer.elapsed + Date.now() - timer.runningSince
        // timer.runningSince = null
      }

      return timer
    })
    console.log("updatedTimers", updatedTimers)
    this.setState({ timers: updatedTimers })
    // stopTimer(timer)
  }

  render() {
    const { timers, isOpen } = this.state
    console.log("timers", timers)
    return (
      <div className="ui three column centered grid" style={{ width: "100%" }}>
        {false ? (
          <div>Loading...</div>
        ) : (
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
        )}
      </div>
    )
  }
}

export default TimersDashboard
