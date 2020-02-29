import React, { Component } from "react"

import TimerList from "./TimerList/TimerList"
import ToggleableTimerForm from "./ToggleableTimerForm/ToggleableTimerForm"

class TimersDashboard extends Component {

  state = {
    timers: [
      {
        "title": "Mow the lawn",
        "project": "House Chores",
        "elapsed": 5510288,
        "id": "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7",
        "runningSince": null
      },
      {
          "title": "New timer",
          "project": "New project",
          "id": "963909ac-efab-401c-a8dc-302253f7712c",
          "elapsed": 76671,
          "runningSince": null
      },
      {
          "title": "Timer22",
          "project": "Project22",
          "id": "be0b93eb-935d-4663-a6f0-7b284d5c7cfb",
          "elapsed": 33642,
          "runningSince": null
      }
    ],
    isOpen: false
  }

  onAddTimerHandle = (obj) => {
    const id = this.state.timers.length + 1
    const newTimer = {
      ...obj,
      id,
      elapsed: 0,
      runningSince: null
    }
    console.log('new timer', newTimer)

    this.setState({
      timers: [
        ...this.state.timers,
        newTimer
      ]
    })
  }

  onUpdateTimerHandle = (id, obj) => {
    console.log(obj)
    let timer = this.state.timers.filter(timer => {
      if (timer.id === obj) {

      }
    })

    this.setState({ isOpen: false })
  }

  onRemoveTimerHandle = (id) => {
    let timers = this.state.timers.filter(timer => timer.id !== id)
    this.setState({ timers })
  }

  onStartTimerHandle = (id, runningSince) => {
    const updatedTimers = this.state.timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          runningSince
        }
      }

      return timer
    })

    this.setState({ timers: updatedTimers })
  }

  onStopTimerHandle = (timer) => {
    clearInterval(timer)
  }

  onToggleFormHandle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div className='ui three column centered grid' style={{ width: '100%' }}>
        <div className='column'>
          <TimerList
            timers={this.state.timers}
            onStartTimerHandle={this.onStartTimerHandle}
            onStopTimerHandle={this.onStopTimerHandle}
            onRemoveTimerHandle={this.onRemoveTimerHandle}
            onUpdateTimerHandle={this.onUpdateTimerHandle}
            onToggleFormHandle={this.onToggleFormHandle}
          />
          <ToggleableTimerForm
            isOpen={this.state.isOpen}
            onAddTimerHandle={this.onAddTimerHandle}
            onToggleFormHandle={this.onToggleFormHandle}
          />
        </div>
      </div>
    )
  }
}

export default TimersDashboard
