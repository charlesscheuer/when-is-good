import React from 'react'
import TimeSelect from './timeSelect/TimeSelect'

const Calendar = props => {
  return (
    <div>
      <TimeSelect
        dates={props.dates}
        mobileTable={props.mobileTable}
        window={props.window}
        table={props.table}
        onTimeSelect={props.onTimeSelect}
        vw={props.vw}
      />
    </div>
  )
}

export default Calendar
