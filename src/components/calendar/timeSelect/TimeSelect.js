import React from 'react'

const displayHandler = (datetime, window) => {
  if (window === 1) {
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

const displayTableHandler = (table, dates, window) => {
  let displayTable = []
  for (let row of table) {
    var displayRow = {}
    var index = 0 //FIXME: Ugly hack
    for (let key in row) {
      var value = row[key]
      var dateTimeObj = new Date(key)
      if (window === 1) {
        var dTObject = new Date(dates[index])
        var date = dTObject.getDate()
        displayRow[date] = value
        index++
      } else {
        var min = dateTimeObj.getMinutes()
        if (min % window === 0) displayRow[key] = value
      }
    }
    displayTable.push(displayRow)
    if (window === 1) {
      break
    }
  }
  return displayTable
}

const TimeSelect = props => {
  let table = [...props.table]
  let dates = [...props.dates]
  let window = props.window
  let displayTable = displayTableHandler(table, dates, window)
  return (
    <div className="TimeSelect">
      {props.vw < 624 ? (
        // not sure how to make this only one column here
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
      ) : (
        <div className="TimeSlot">
          <div className="TimeSlot_col">
            {displayTable.map((row, x) => {
              return (
                <div className="TimeSlot_col_row" key={x}>
                  {Object.keys(row).map((datetime, y) => {
                    return (
                      <button
                        className={
                          row[datetime]
                            ? 'TimeSlot_time TimeSlot_time_selected'
                            : 'TimeSlot_time'
                        }
                        draggable="true"
                        onClick={e => props.onClick(e, x, y)}
                        key={x + y}
                      >
                        <p className="TimeSlot_time_value">
                          {displayHandler(datetime, window)}
                        </p>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeSelect
