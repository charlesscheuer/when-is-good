import React, { Component } from 'react'
import TimeButton from './TimeButton'
import DayButton from './DayButton'
import WeekSelect from '../Calendar/WeekSelect/WeekSelect'
export default class TopBar extends Component {
  constructor() {
    super()
    this.state = {
      active: 30
      // 30 minutes is the default time
      //
    }
  }

  changedMins = mins => {
    this.setState({
      active: mins
    })
    this.props.onSelectWindow(mins)
    // function that passes mins to a function from props to change the minutes for the calendar view
  }

  toDaysHandler = e => {
    e.preventDefault()
    this.setState({
      active: 'days'
    })
    // this.props.onSelectWindow()
    //  👆not sure what you want to pass in here to change it to days so i'll leave it
    // this is a handler for if user clicks the button for days
  }

  render() {
    return (
      <div className="topbar">
        <div className="container">
          <div className="topBar">
            <TimeButton
              mins={'15'}
              clicked={() => {
                this.changedMins(15)
              }}
              isActive={this.state.active === 15}
            />
            <TimeButton
              mins={'30'}
              clicked={() => {
                this.changedMins(30)
              }}
              isActive={this.state.active === 30}
            />
            <div className="topBar_center">
              <p className="topBar_center_title">select time</p>
              <p className="topBar_center_day">– OR –</p>
              <DayButton
                isActive={this.state.active === 'days'}
                clicked={e => this.toDaysHandler(e)}
              />
            </div>

            <TimeButton
              mins={'45'}
              clicked={() => {
                this.changedMins(45)
              }}
              isActive={this.state.active === 45}
            />
            <TimeButton
              mins={'60'}
              clicked={() => {
                this.changedMins(60)
              }}
              isActive={this.state.active === 60}
            />
          </div>
        </div>
        <WeekSelect />
      </div>
    )
  }
}
