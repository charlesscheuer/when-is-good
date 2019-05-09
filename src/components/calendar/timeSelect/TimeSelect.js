import React from 'react'

const displayHandler = (datetime, window) => {
  if(window === 1) {
    return datetime
  }
  var dateTimeObj = new Date(datetime)
  var hour = dateTimeObj.getHours()
  var min = dateTimeObj.getMinutes()
  var ampm = hour >= 12 ? 'pm' : 'am'
  hour = hour % 12
  hour = hour ? hour : 12
  if (min === 0) return `${hour}${ampm}`
  return `:${min}`
}

const displayTableHandler = (table, window) => {
  let displayTable = []
  for(let row of table) {
    var displayRow = []
    for(let datetime of row) {
      var dateTimeObj = new Date(datetime[0])
      if(window === 1) {
        var date = dateTimeObj.getDate()
        displayRow.push([date, datetime[1]])
      }
      else {
        var min = dateTimeObj.getMinutes()
        if(min%window === 0)displayRow.push([datetime[0], datetime[1]])
      }
    }
    displayTable.push(displayRow)
    if(window === 1) {
      break
    }
  }
  return displayTable
}

const TimeSelect = props => {
  let table = [...props.table]
  let window = props.window
  let displayTable = displayTableHandler(table, window)
  return (
    <div className="TimeSelect">
      <div className="TimeSlot">
        <div className="TimeSlot_col">
          {displayTable.map((row, x) => {
            return (
              <div className="TimeSlot_col_row" key={x}>
                {row.map((datetime, y) => {
                  return (
                    <button
                      className={
                        datetime[1]
                          ? 'TimeSlot_time TimeSlot_time_selected'
                          : 'TimeSlot_time'
                      }
                      draggable="true"
                      onClick={e => props.onClick(e, x, y)}
                      key={x + y}
                    >
                      <p className="TimeSlot_time_value">
                        {displayHandler(datetime[0], window)}
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
