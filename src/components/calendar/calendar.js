import React from 'react'
import WeekSelect from './WeekSelect/WeekSelect'
import TimeSelect from './TimeSelect/TimeSelect'

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
