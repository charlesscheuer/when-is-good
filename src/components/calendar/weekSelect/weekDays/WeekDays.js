import React, { Component } from 'react'
import NumberDate from './NumberDate'
import WordDate from './WordDate'

export default class Weekdays extends Component {
  render() {
    var map = {
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
      0: 'Sun'
    }
    var days = this.props.dates.map(datetime => {
      var dateTimeObj = new Date(datetime)
      return [dateTimeObj.getDate(), map[dateTimeObj.getDay()]]
    })
    let { vw } = this.props
    return (
      <div className="weekdays">
        {vw < 624 ? (
          <div className="weekdays_day">
            <NumberDate num={days[0][0]} />
            <WordDate
              className="weekLetter"
              date={days[0][1]}
            />
          </div>
        ) : (
          <div className="weekdays">
            {days.map(day => {
              return (
                <div key={day} className="weekdays_day">
                  <NumberDate num={day[0]} />
                  <WordDate className="weekLetter" date={day[1]} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
