import React, { Component, PureComponent } from "react"

import TimerActionButton from "./TimerActionButton"
import { renderElapsedString } from "../../../../../utils"

// there is a bug, when you click edit button and then cancel or update,
// timer stop working correctly
class Timer extends Component {
  state = {
    name: "Oleg",
  }

  componentDidMount() {
    const { runningSince } = this.props
    this.startSetTimeout(runningSince)
  }

  // shouldComponentUpdate(nextProps) {
  //   const { project, title } = this.props
  //   return project !== nextProps.project || title !== nextProps.title
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { runningSince } = this.props
    console.log("[Timer] componentDidUpdate()", snapshot)
    if (runningSince) {
      this.startSetTimeout(runningSince)
    } else {
      clearInterval(this.timerId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      name: "Kirill"
    }
  }

  getSnapshotBeforeUpdate() {
    return "snpashot data"
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
