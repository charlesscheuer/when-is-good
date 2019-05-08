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
      startDate: 4,
      endDate: 10
    }
  }

  weekNext() {
    if (this.state.startDate + 7 < 31) {
      // you can just use this.setState once and seperate by comma right?
      this.setState({
        startDate: this.state.startDate + 7,
        endDate: this.state.endDate + 7
      })
    } else {
      this.setState({
        /*month: [(indexOf(this.state.month) + 1)],*/
        startDate: this.state.startDate + 7,
        endDate: this.state.endDate + 7
      })
    }
  }

  weekPrevious() {
    // might be using a different type of method for these anyway
  }

  // class for the arrow buttons is set on the components and is week_arrow

  // I think this component needs some sort of onStateChange to make the clicking change the week state
  render() {
    // let {startDate} = this.state;
    // let {endDate} = this.state;
    return (
      <div>
        <div className="week">
          <LeftArrowButton onClick={this.weekPrevious} />
          <p className="week_title">
            {this.state.month[3]} {this.state.startDate}-{this.state.endDate}
          </p>
          <RightArrowButton onClick={this.weekNext} />
        </div>
      </div>
    )
  }
}
