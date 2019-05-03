import React from 'react'
import WeekSelect from './weekSelect/weekSelect';
import TimeSelect from './timeSelect/timeSelect';

const Calendar = (props) => {
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