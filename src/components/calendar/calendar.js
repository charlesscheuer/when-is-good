import React from 'react'
import TimeSelect from './TimeSelect/TimeSelect'

const Calendar = props => {
  return (
    <div>
      <TimeSelect
        window={props.window}
        table={props.table}
        onClick={props.onClick}
      />
    </div>
  )
}

export default Calendar
