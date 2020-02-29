import React from "react"

const TimerActionButton = ({ timerIsRunning, onStartTimerHandle, onStopTimerHandle }) => (
  timerIsRunning
    ? <div className='ui bottom attached red basic button' onClick={onStopTimerHandle}>Stop</div>
    : <div className='ui bottom attached green basic button' onClick={onStartTimerHandle}>Start</div>
)

export default TimerActionButton