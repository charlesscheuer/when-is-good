import React, { Component } from 'react'
import LeftArrowButton from './LeftArrowButton'
import RightArrowButton from './RightArrowButton'

export default class WeekSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: [],
    }
    this.calculateDays = this.calculateDays.bind(this)

  }

  calculateDays() {
    var map = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    var days = this.props.dates.map(datetime => {
      var dateTimeObj = new Date(datetime)
      return [dateTimeObj.getDate(), map[dateTimeObj.getMonth()]]
    })
    return days
  }

  componentWillMount() {
    var days = this.calculateDays()
    this.setState({
      days: days
    })
  }

  render() {
    return (
      <div className="week">
        <LeftArrowButton clicked={() => this.props.weekButtonHandler(false)} />
        <div className="week_title">
          {this.props.vw < 624 ? (
            <p className="week_title">
              {this.state.days[0][1]}{' '}
              {this.state.days[0][0]}
            </p>
          ) : (
            <p className="week_title">
              {this.state.days[0][1]} {this.state.days[0][0]}
              –{this.state.days[6][0]}
            </p>
          )}
        </div>
        <RightArrowButton clicked={() => this.props.weekButtonHandler(true)} />
      </div>
    )
  }
}
