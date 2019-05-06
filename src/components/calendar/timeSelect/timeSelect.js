import React from 'react'

const displayHandler = datetime => {
  var dateTimeObj = new Date(datetime)
  var hour = dateTimeObj.getHours()
  var min = dateTimeObj.getMinutes()
  var ampm = hour >= 12 ? 'pm' : 'am'
  hour = hour % 12
  hour = hour ? hour : 12
  if (min === 0) return `${hour}${ampm}`
  return `${hour}:${min}${ampm}`
}

const TimeSelect = props => {
  let times = [...props.table]
  return (
    <div className="TimeSelect">
      <div className="TimeSelect_containTitle">
        <h1 className="TimeSelect_title">When is good?</h1>
      </div>
      <table className="TimeSlot">
        <tbody className="TimeSlot_col">
          {times.map((row, x) => {
            return (
              <tr key={x}>
                {row.map((datetime, y) => {
                  return (
                    <td
                      className="TimeSlot_time"
                      draggable="true"
                      onClick={e => props.onClick(e, x, y)}
                      key={x + y}
                    >
                      {displayHandler(datetime[0])}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TimeSelect
