import React, { Component } from "react"

import Timer from "./Timer/Timer"
import TimerForm from "../../../../components/TimerForm/TimerForm"

class EditableTimer extends Component {

  state = {
    isOpen: false,
    editFormOpen: false
  }

  onEditTimer = () => {
    this.setState({ isOpen: true })
  }

  onOpenEditForm = () => {
    this.setState({ editFormOpen: true })
  }

  render() {
    const { editFormOpen } = this.state
    const { onToggleFormHandle } = this.props

    if (editFormOpen) {
      return (
        <TimerForm
          { ...this.props }
          onOpenEditForm={this.onOpenEditForm}
          onUpdateTimerHandle={this.props.onUpdateTimerHandle}
          onToggleFormHandle={onToggleFormHandle}
        />
      );
    } else {
      return (
        <Timer
          { ...this.props }
          onEditTimer={this.onEditTimer}
          onOpenEditForm={this.onOpenEditForm}
        />
      );
    }
  }
}

export default EditableTimer
