import React from 'react'
import { getTimezoneDifference } from 'lib/library.js'

const displayHandler = (datetime, window, creatorTimezone, inviteeTimezone) => {
  if (window === 1) {
    return datetime
  }
  //TODO: Handle timezone better using moment()
  var dateTimeObj = new Date(datetime)
  var hour = dateTimeObj.getHours()
  var newhour = hour
  var min = dateTimeObj.getMinutes()
  var ampm = hour >= 12 ? 'pm' : 'am'
  var tzdiff = getTimezoneDifference(creatorTimezone, inviteeTimezone)
  if(tzdiff !== 0) {
    newhour = hour + tzdiff
    if(ampm === 'am' && hour < 12 && newhour >= 12) ampm = 'pm'
    else if(ampm === 'pm' && hour < 24 && newhour >= 24) ampm = 'am'
  }
  newhour = newhour % 12
  newhour = newhour ? newhour : 12
  var endTime = getEndTime(newhour, min, window)
  var endHour = endTime[0]
  var endMin = endTime[1]
  var endampm = ampm
  if(newhour === 11 && endHour === 12) {
    endampm = (ampm === 'am')?'pm':'am'
  }
  if(endHour === 13) endHour = 1
  if (min === 0) {
    if(endMin === 0) return `${newhour}${ampm} - ${endHour}${endampm}`
    return `${newhour}${ampm} - ${endHour}:${endMin}${endampm}`
  } else {
    if(endMin === 0) return `${newhour}:${min}${ampm} - ${endHour}${endampm}`
    return `${newhour}:${min}${ampm} - ${endHour}:${endMin}${endampm}`
  }
}

const getEndTime = (hour, min, window) => {
  if(window === 60) return [hour+1, min]
  if(min === 0) return [hour, window]
  if(window === 15) {
    if(min === 15 || min === 30) return [hour, min+window]
    return [hour+1, 0]
  }
  if(window === 30) {
    return [hour+1, 0]
  }
  if(window === 45) {
    return [hour+1, 30]
  }
}

const displayTableHandler = (table, window, mobileTable, vw) => {
  let displayTable = []
  // FIXME: Refactor this code in the future. This logic is very ugly.
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
  let displayTable = displayTableHandler(table, window, mobileTable, props.vw)
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
                            {displayHandler(datetime, window, creatorTimezone, inviteeTimezone)}
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
