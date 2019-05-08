import React from 'react'
import TimeSelect from './TimeSelect/TimeSelect'

const Calendar = props => {
  return (
    <div>
      <TimeSelect
        selected={props.selected}
        table={props.table}
        onClick={props.onClick}
      />
    </div>
  )
}

export default Calendar
