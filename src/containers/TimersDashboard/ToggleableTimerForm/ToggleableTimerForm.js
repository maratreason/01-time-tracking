import React, { Component } from "react"
import TimerForm from "../../../components/TimerForm/TimerForm"

class ToggleableTimerForm extends Component {
  state = {
    isOpen: false,
  }

  isOpenFormHandle = () => {
    this.setState({ isOpen: true })
  }

  closeForm = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state

    return (
      <>
        {isOpen ? (
          <TimerForm
            isOpen={isOpen}
            closeForm={this.closeForm}
            {...this.props}
          />
        ) : (
          <div className="ui basic content center aligned segment">
            <button
              type="button"
              className="ui basic button icon"
              onClick={this.isOpenFormHandle}
            >
              <i className="plus icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default ToggleableTimerForm
