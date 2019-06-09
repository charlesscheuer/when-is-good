import React from 'react'
import { getTimezoneDifference } from '../../../lib/library.js'

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

const displayTableHandler = (table, window, mobileTable, creatorTimezone, inviteeTimezone, vw) => {
  let displayTable = []
  // FIXME: Refactor this code in the future. This logic is very ugly.
  var tzdiff = getTimezoneDifference(creatorTimezone, inviteeTimezone)
  console.log("tzdiff", tzdiff)
  var i = 0;
  if(vw < 624) {
    for (let row of table) {
      var displayRow = {}
      var key = mobileTable[i]
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

const onTimeSelectClassName = (val) => {
  if (val === 1) return 'TimeSlot_time TimeSlot_time_selected'
  else if(val === 0) return 'TimeSlot_time'
  return 'TimeSlot_time TimeSlot_time_invitee_selected'
}

const TimeSelect = props => {
  let table = [...props.table]
  let creatorTimezone = props.creatorTimezone
  let inviteeTimezone = props.inviteeTimezone
  let dates = [...props.dates].map(date => new Date(date).getDate())
  let window = props.window
  let mobileTable = props.mobileTable
  let displayTable = displayTableHandler(table, window, mobileTable, creatorTimezone, inviteeTimezone,  props.vw)
  return (
    <div className="TimeSelect">
        <div className="TimeSlot">
          <div className="TimeSlot_col">
            {displayTable.map((row, x) => {
              if(Object.entries(row).length === 0) return (null)
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
                          className={onTimeSelectClassName(row[datetime])}
                          draggable="true"
                          onClick={e => props.onTimeSelect(e, datetime, row[datetime])}
                          key={x + y}
                        >
                          <p className="TimeSlot_time_value">
                            {displayHandler(datetime, window)}
                          </p>
                        </button>
                      )} else return(null)
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
