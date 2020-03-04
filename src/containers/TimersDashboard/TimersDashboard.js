import React, { Component } from "react"
import update from "immutability-helper"

import TimerList from "./TimerList/TimerList"
import ToggleableTimerForm from "./ToggleableTimerForm/ToggleableTimerForm"

class TimersDashboard extends Component {
  state = {
    timers: [
      {
        title: "Mow the lawn",
        project: "House Chores",
        elapsed: 5510288,
        id: "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7",
        runningSince: null,
        array: [1, 2, 3],
      },
      {
        title: "New timer",
        project: "New project",
        id: "963909ac-efab-401c-a8dc-302253f7712c",
        elapsed: 76671,
        runningSince: null,
        array: [1, 2, 3],
      },
      {
        title: "Timer22",
        project: "Project22",
        id: "be0b93eb-935d-4663-a6f0-7b284d5c7cfb",
        elapsed: 33642,
        runningSince: null,
        array: [1, 2, 3],
      },
    ],
    // you don't need it here anymore
    isOpen: false,
    showError: false,
  }

  // obj is very common name, try to be more specific
  addTimer = obj => {
    const { timers } = this.state

    const id = timers.length + 1
    const newTimer = {
      ...obj,
      id,
      elapsed: 0,
      runningSince: null,
    }

    // https://www.youtube.com/watch?v=Wo0qiGPSV-s
    // https://en.reactjs.org/docs/update.html
    // try to figure out how it works and replace the code below
    // and in other places of app where you need immutable data

    this.setState({
      timers: update(timers, {
        $push: [newTimer]
      }),
    })

    timers.forEach(timer => {
      if (timer.id === "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7") {
        timer.array.push(4)
      }
    })

    // this.setState({
    //   timers: [...timers, newTimer],
    // })
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
  }

  // переименовать в removeTimer()
  removeTimer = id => {
    const { timers } = this.state

    const updatedTimers = timers.filter(timer => timer.id !== id)
    this.setState({ timers: updatedTimers })
  }

  startTimer = id => {
    const { timers } = this.state
    const updatedTimers = timers.map(timer => {
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
    const { timers } = this.state

    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        timer.elapsed = timer.elapsed + Date.now() - timer.runningSince
        timer.runningSince = null
      }

      return timer
    })

    this.setState({
      timers: updatedTimers,
    })
  }

  // you don't need it here anymore
  toggleForm = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  static getDerivedStateFromError(error) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log("error", error)
    return {
      showError: true,
    }
  }

  onUpdateFormHandle = () => {
    const { updateTimer, onOpenTimer, id } = this.props

    updateTimer(id, this.state)
    this.setState({ title: "", project: "" })
    onOpenTimer()
  }

  render() {
    const { timers, isOpen, showError } = this.state

    return (
      <div className="ui three column centered grid" style={{ width: "100%" }}>
        {showError
          ? <h1>Some error occured</h1>
        : (
          <div className="column">
            <TimerList
              timers={timers}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              removeTimer={this.removeTimer}
              updateTimer={this.updateTimer}
              toggleForm={this.toggleForm}
            />
            <ToggleableTimerForm
              isOpen={isOpen}
              addTimer={this.addTimer}
              toggleForm={this.toggleForm}
            />
          </div>
)}
      </div>
    )
  }
}

export default TimersDashboard
