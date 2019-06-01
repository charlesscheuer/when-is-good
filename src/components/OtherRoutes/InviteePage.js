import React, { Component } from 'react'
import { throttle } from 'throttle-debounce'
import TopBar from '../topBar/TopBar'
import Calendar from '../calendar/Calendar'
import Creds from '../Creds'
import '../../SASS/main.scss'
import CalendarIcon from '../calendar/CalendarIcon'
import WeekDays from '../calendar/weekSelect/weekDays/WeekDays'
import WeekSelect from '../calendar/weekSelect/WeekSelect'

import {
  getPreviousNextWeek,
  getPreviousNextDay,
  convertToAppDates,
  getInitTimes,
  convertToStdDates,
  fillCurrentTimes,
  resetSelection,
} from '../../lib/library.js'
import { backend_url } from '../../lib/controller.js'

class InviteePage extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [] }
  }

  componentWillMount() {
    var id = this.props.id
    this.getCalendarEvent(id).then(state => this.setState(state))
  }

  componentDidMount() {
    this.updateViewportWidth()
    window.addEventListener('resize', this.updateViewportWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewportWidth)
  }

  updateViewportWidth = () => {
    throttle(this.initWindow(), 500)
  }

  initWindow = () => {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth })
  }

  onSelectWindow = value => {
    if (value === 1) {
      var table = this.state.table
      table = resetSelection(table)
      this.setState({
        ...this.state,
        table: table,
        window: value
      })
    } else {
      this.setState({
        ...this.state,
        window: value
      })
    }
  }

  onTimeSelect = (e, datetime) => {
    e.preventDefault()
    var newTable = [...this.state.table]
    if (this.state.window === 1) {
      newTable.forEach(row => {
        var rowObj = convertToStdDates(Object.keys(row))
        Object.keys(row).forEach((key, i) => {
          var date = rowObj[i].getDate()
          if(date === parseInt(datetime)) {
            row[key] = !row[key]
          }
        })
      })
    } else {
      newTable.forEach(row => {
        Object.keys(row).forEach(key => {
          if(key === datetime) row[key] = !row[key]
        })
      })
    }
    this.setState({
      table: newTable
    })
  }

  weekButtonHandler = next => {
    var vw = this.state.viewportWidth
    var start = this.state.dates[0]
    var end = this.state.dates[6]
    var mobileTable = this.state.mobileTable
    var times = getInitTimes(this.state.startTime, this.state.endTime)
    if(vw < 624) {
      var mDate = convertToStdDates(mobileTable)
      mDate = mDate.map(md => getPreviousNextDay(md, next))
      mDate = convertToAppDates(mDate)
      var timewindows = []
      times = getInitTimes(this.state.startTime, this.state.endTime)
      times.forEach(time => {
        timewindows.push(`${time}:00`)
        timewindows.push(`${time}:15`)
        timewindows.push(`${time}:30`)
        timewindows.push(`${time}:45`)
      })
      var newMobileTable  = []
      timewindows.forEach(time => {
        newMobileTable.push(`${mDate[0]} ${time}`)
      })
      if(!this.state.dates.includes(mDate[0])) {
        if (next) var dates = getPreviousNextWeek(end, next)
        else dates = getPreviousNextWeek(start, next)
        dates = convertToAppDates(dates)
      } else dates = this.state.dates
      this.setState({
        mobileTable: newMobileTable
      })
    } else {
      if (next) dates = getPreviousNextWeek(end, next)
      else dates = getPreviousNextWeek(start, next)
      dates = convertToAppDates(dates)
    }
    var tables = fillCurrentTimes(dates, times)
    this.setState({
      dates: dates,
      table: tables[0],
    })
  }

  createCalendarEvent = () => {
    var body = { "state" : this.state }
    var api = backend_url + 'user'
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        this.setState({eventCode: data.id})
      }.bind(this))
  }

  getCalendarEvent = (id) => {
    var api = backend_url + id
    return fetch(api, {
        method: 'GET',
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        console.log('Got:', JSON.parse(JSON.stringify(data)).data.state)
        return JSON.parse(JSON.stringify(data)).data.state
      })
  }

  render() {
    const { dates } = this.state
    return dates.length ? (
        <div ref={this.viewportWidthRef} className="App">
              <div className="bar">
                <div className="brand">
                  <CalendarIcon />
                  <div className="brand-title">
                    <h1 className="brand-title-text">I'm Free FYI</h1>
                  </div>
                </div>
              </div>
              <TopBar onSelectWindow={this.onSelectWindow} />
              <div className="sticks">
                <WeekSelect
                  dates={this.state.dates}
                  mobileTable={this.state.mobileTable}
                  weekButtonHandler={this.weekButtonHandler}
                  vw={this.state.viewportWidth}
                />
                <WeekDays
                  vw={this.state.viewportWidth}
                  dates={this.state.dates}
                  mobileTable={this.state.mobileTable}
                  className="stickyScroll"
                />
              </div>
              <Calendar
                dates={this.state.dates}
                mobileTable={this.state.mobileTable}
                window={this.state.window}
                table={this.state.table}
                onTimeSelect={this.onTimeSelect}
                vw={this.state.viewportWidth}
              />
              <div className="create">
                <button className="create_event">
                  Submit times
                </button>
              </div>
              <Creds />
          </div>) : <span>Loading event dates...</span>
  }
}

export default InviteePage
