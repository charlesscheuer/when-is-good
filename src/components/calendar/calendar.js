import React from 'react'
import TimeSelect from './TimeSelect/TimeSelect'
import WeekSelect from './WeekSelect/WeekSelect'

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
