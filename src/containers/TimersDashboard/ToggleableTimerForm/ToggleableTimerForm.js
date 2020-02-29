import React, { Component } from "react"
import TimerForm from "../../../components/TimerForm/TimerForm"

class ToggleableTimerForm extends Component {

  render() {
    const { onToggleFormHandle, isOpen } = this.props

    return (
      <>
        {
          isOpen
          ? <TimerForm
              isOpen={isOpen}
              onToggleFormHandle={onToggleFormHandle}
              {...this.props}
            />
          : (
              <div className='ui basic content center aligned segment'>
                <button className='ui basic button icon' onClick={onToggleFormHandle}>
                  <i className='plus icon' />
                </button>
              </div>
            )
        }
      </>

    )
  }
}

export default ToggleableTimerForm