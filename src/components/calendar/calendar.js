import React from 'react'
import TimeSelect from '../Calendar/TimeSelect/TimeSelect'
import WeekSelect from '../Calendar/WeekSelect/WeekSelect'

const Calendar = props => {
  return (
    <div>
      <WeekSelect />
      <TimeSelect
        selected={props.selected}
        table={props.table}
        onClick={props.onClick}
      />
    </div>
  )
}

export default Calendar
