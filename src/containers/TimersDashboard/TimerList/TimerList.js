import React from "react"

import EditableTimer from "./EditableTimer/EditableTimer"

const TimerList = ({
  timers,
  startTimer,
  stopTimer,
  removeTimer,
  updateTimer,
  toggleForm,
}) => {
  // if (timers.length === 4) {
  //   throw new Error ("not performing tonight!")
  // }
  const timer = timers.map(currentTimer => {
    return (
      <EditableTimer
        {...currentTimer}
        key={currentTimer.id}
        startTimer={startTimer}
        stopTimer={stopTimer}
        removeTimer={removeTimer}
        updateTimer={updateTimer}
        toggleForm={toggleForm}
      />
    )
  })

  return <div id="timers">{timer}</div>
}

export default TimerList
