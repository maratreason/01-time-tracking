import React, { Component } from "react"

import Timer from "./Timer/Timer"
import TimerForm from "../../../../components/TimerForm/TimerForm"

class EditableTimer extends Component {
  state = {
    isOpen: false,
  }

  onOpenTimer = () => {
    this.setState({ isOpen: false })
  }

  onOpenEditForm = () => {
    this.setState({ isOpen: true })
  }

  render() {
    const { isOpen } = this.state
    const { onToggleFormHandle, onUpdateTimerHandle } = this.props

    if (isOpen) {
      return (
        <TimerForm
          {...this.props}
          onOpenTimer={this.onOpenTimer}
          onOpenEditForm={this.onOpenEditForm}
          onUpdateTimerHandle={onUpdateTimerHandle}
          onToggleFormHandle={onToggleFormHandle}
        />
      )
    }

    return (
      <Timer
        {...this.props}
        onOpenTimer={this.onOpenTimer}
        onOpenEditForm={this.onOpenEditForm}
      />
    )
  }
}

export default EditableTimer
