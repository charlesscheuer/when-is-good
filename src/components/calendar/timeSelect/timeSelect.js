import React from 'react'

const displayHandler = datetime => {
  var dateTimeObj = new Date(datetime)
  var hour = dateTimeObj.getHours()
  var min = dateTimeObj.getMinutes()
  var ampm = hour >= 12 ? 'pm' : 'am'
  hour = hour % 12
  hour = hour ? hour : 12
  if (min === 0) return `${hour}${ampm}`
  return `:${min}`
}

const TimeSelect = props => {
  let table = [...props.table]
  return (
    <div className="TimeSelect">
      <div className="TimeSlot">
        <div className="TimeSlot_col">
          {table.map((row, x) => {
            return (
              <div className="TimeSlot_col_row" key={x}>
                {row.map((datetime, y) => {
                  return (
                    <button
                      className="TimeSlot_time"
                      draggable="true"
                      onClick={e => props.onClick(e, x, y)}
                      key={x + y}
                    >
                      <p className="TimeSlot_time_value">
                        {displayHandler(datetime[0])}
                      </p>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TimeSelect
