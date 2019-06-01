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
    let { vw } = this.props
    if(vw < 624) {
      var dateTimeObj = new Date(this.props.mobileTable[0])
      var days = [[dateTimeObj.getDate(), map[dateTimeObj.getDay()]]]
    } else {
      days = this.props.dates.map(datetime => {
        var dateTimeObj = new Date(datetime)
        return [dateTimeObj.getDate(), map[dateTimeObj.getDay()]]
      })
    }
    return (
      <div className="weekdays">
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
      </div>
    );
  }
}
