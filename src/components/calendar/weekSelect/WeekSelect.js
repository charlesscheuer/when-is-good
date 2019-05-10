import React, { Component } from 'react'
import LeftArrowButton from './LeftArrowButton'
import RightArrowButton from './RightArrowButton'

export default class WeekSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December'
      ],
      currentMonth: 4,
      currentDate: 1,
      // 👆these will soon be passed as props
      startDate: 1,
      endDate: 7
    }
  }

  // edge case: start date + 7 was less than 31 and end date + 7 > 31
  weekNext = () => {
    let { startDate } = this.state
    let { endDate } = this.state
    if (endDate + 7 <= 31 && startDate + 7 <= 31) {
      this.setState({
        startDate: startDate + 7,
        endDate: endDate + 7
      })
    } else if (endDate + 7 > 31 && startDate + 7 > 31) {
      let subtract = (endDate - 31) * -1
      let newDate = 7 - subtract
      startDate = 1
      this.setState({
        startDate: startDate,
        endDate: newDate
      })
    } else if (endDate + 7 > 31) {
      // 22-28 then got 29-5 expected 29-4
      let subtract = (endDate - 31) * -1
      let newDate = 7 - subtract
      startDate = startDate + 7
      this.setState({
        startDate: startDate,
        endDate: newDate
      })
    } else if (startDate + 7 > 31) {
      let subtract = (startDate - 31) * -1
      let newDate = 7 - subtract
      endDate = endDate + 7
      this.setState({
        startDate: newDate,
        endDate: endDate
      })
    }
    this.props.dayNext()
  }

  weekPrevious = () => {
    let { startDate } = this.state
    let { endDate } = this.state
    let minus = (endDate - 7) * -1
    let newEnd = 31 - minus
    if (startDate - 7 >= 1 && endDate - 7 >= 1) {
      this.setState({
        startDate: startDate - 7,
        endDate: endDate - 7
      })
    } else if (startDate - 7 >= 1 && endDate - 7 < 1) {
      this.setState({
        startDate: startDate - 7,
        endDate: newEnd
      })
    } else if (startDate - 7 < 1) {
      // new month here
      // go from 1
      let subtract = (startDate - 7) * -1
      let newDate = 31 - subtract
      if (endDate - 7 > 0) {
        this.setState({
          startDate: newDate,
          endDate: endDate - 7
        })
      } else {
        this.setState({
          startDate: newDate,
          endDate: newEnd
        })
      }
    }
    this.props.dayPrev()
  }

  // class for the arrow buttons is set on the components and is week_arrow

  // I think this component needs some sort of onStateChange to make the clicking change the week state
  render() {
    // let {startDate} = this.state;
    // let {endDate} = this.state;
    return (
      <div>
        <div className="week">
          <LeftArrowButton clicked={this.weekPrevious} />
          <div className="week_title">
            {this.props.vw < 624 ? (
              <p className="week_title">
                {this.state.month[this.state.currentMonth]}{' '}
                {this.state.currentDate}
              </p>
            ) : (
              <p className="week_title">
                {this.state.month[this.state.currentMonth]}{' '}
                {this.state.startDate}–{this.state.endDate}
              </p>
            )}
          </div>
          <RightArrowButton clicked={this.weekNext} />
        </div>
      </div>
    )
  }
}
