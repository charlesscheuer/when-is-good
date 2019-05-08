import React from 'react'
<<<<<<< HEAD
import TimeSelect from '../Calendar/TimeSelect/TimeSelect'
import WeekSelect from '../Calendar/WeekSelect/WeekSelect'
=======
import TimeSelect from './TimeSelect/TimeSelect'
>>>>>>> 76e84926d903070d56340a186b512b49f3ca251c

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
