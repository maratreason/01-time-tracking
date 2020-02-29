import React from "react"

import EditableTimer from "./EditableTimer/EditableTimer"

const TimerList = ({ timers, onStartTimerHandle, onStopTimerHandle, onRemoveTimerHandle, onUpdateTimerHandle, onToggleFormHandle }) => {

  const timer = timers.map(timer => {
    return (
      <EditableTimer
        {...timer}
        key={timer.id}
        onStartTimerHandle={onStartTimerHandle}
        onStopTimerHandle={onStopTimerHandle}
        onRemoveTimerHandle={onRemoveTimerHandle}
        onUpdateTimerHandle={onUpdateTimerHandle}
        onToggleFormHandle={onToggleFormHandle}
      />
    )
  })

  return (
    <div id='timers'>
      { timer }
    </div>
  )
}

export default TimerList
