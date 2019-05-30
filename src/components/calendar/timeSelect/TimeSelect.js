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

const displayTableHandler = (table, window, mobileDate, vw) => {
  let displayTable = []
  // FIXME: Refactor this code in the future. This logic is very ugly.
  var i = 0;
  if(vw < 624) {
    for (let row of table) {
      var displayRow = {}
      var key = mobileDate[i]
      var value = row[key]
      var dateTimeObj = new Date(key)
      var date = dateTimeObj.getDate()
      if (window === 1) {
        displayRow[date] = value
      } else {
        var min = dateTimeObj.getMinutes()
        if (min % window === 0) displayRow[key] = value
      }
      displayTable.push(displayRow)
      if (window === 1) {
        break
      }
      i++;
    }
  }
  else {
    for (let row of table) {
      displayRow = {}
      for (let key in row) {
        value = row[key]
        dateTimeObj = new Date(key)
        date = dateTimeObj.getDate()
        if (window === 1) {
          displayRow[date] = value
        } else {
          min = dateTimeObj.getMinutes()
          if (min % window === 0) displayRow[key] = value
        }
      }
      displayTable.push(displayRow)
      if (window === 1) {
        break
      }
    }
  }
  return displayTable
}

const TimeSelect = props => {
  let table = [...props.table]
  let dates = [...props.dates].map(date => new Date(date).getDate())
  let window = props.window
  let mobileDate = props.mobileDate
  let displayTable = displayTableHandler(table, window, mobileDate, props.vw)
  return (
    <div className="TimeSelect">
        <div className="TimeSlot">
          <div className="TimeSlot_col">
            {displayTable.map((row, x) => {
              return (
                <div className="TimeSlot_col_row" key={x}>
                  {dates.map((date, y) => {
                    var datetime = ''
                    if (Object.keys(row).length !== 0) {
                      for(let dt of Object.keys(row)) {
                        if(window === 1) {
                          if(parseInt(dt) === date) {
                            datetime = dt
                            break
                          }
                        } else {
                          if(new Date(dt).getDate() === date) {
                            datetime = dt
                            break
                          }
                        }
                      }
                      if(datetime === '') return(null)
                      return (
                        <button
                          className={
                            row[datetime]
                              ? 'TimeSlot_time TimeSlot_time_selected'
                              : 'TimeSlot_time'
                          }
                          draggable="true"
                          onClick={e => props.onClick(e, datetime)}
                          key={x + y}
                        >
                          <p className="TimeSlot_time_value">
                            {displayHandler(datetime, window)}
                          </p>
                        </button>
                      )}
                    }
                  )}
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default TimeSelect
