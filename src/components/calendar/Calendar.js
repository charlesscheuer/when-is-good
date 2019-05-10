import React from 'react'
import TimeSelect from './timeSelect/TimeSelect'

const Calendar = props => {
  return (
    <div>
      <TimeSelect
        window={props.window}
        table={props.table}
        onClick={props.onClick}
        vw={props.vw}
      />
    </div>
  )
}

export default Calendar
