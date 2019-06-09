import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { throttle } from 'throttle-debounce'
import InviteeTopBar from '../topBar/InviteeTopBar'
import Calendar from '../calendar/Calendar'
import Creds from '../Creds'
import '../../SASS/main.scss'
import CalendarIcon from '../calendar/CalendarIcon'
import WeekDays from '../calendar/weekSelect/weekDays/WeekDays'
import WeekSelect from '../calendar/weekSelect/WeekSelect'
import Loader from '../calendar/Loader'

import {
  getPreviousNextWeek,
  getPreviousNextDay,
  convertToAppDates,
  getInitTimes,
  convertToStdDates,
  fillCurrentTimes,
  mapSelectedDateTimes,
  mapInviteeSelectedDateTimes,
} from '../../lib/library.js'
import { backend_url } from '../../lib/controller.js'

class InviteePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      inviteeSelection: [],
      eventTitle: '',
      yourEmail: '',
      yourName: '',
      inviteeName: '',
      inviteeEmail: '',
      inviteeNumber: '',
      calStart: '',
      calEnd: '',
    }
  }

  componentWillMount() {
    var id = this.props.id
    this.getCalendarEvent(id).then(state => {
      state['viewportWidth'] = window.innerWidth
      var table = mapSelectedDateTimes(state.table, state.selection)
      state.table = table
      this.setState(state)
    })
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

  onTimeSelect = (e, datetime, value) => {
    e.preventDefault()
    var newTable = [...this.state.table]
    var inviteeSelection = []
    if (this.state.window === 1) {
      newTable.forEach(row => {
        var rowObj = convertToStdDates(Object.keys(row))
        Object.keys(row).forEach((key, i) => {
          var date = rowObj[i].getDate()
          if(date === parseInt(datetime)) {
            if(value === 1)inviteeSelection.push(key)
            else if(value === 2) inviteeSelection = inviteeSelection.filter(select => new Date(select).getDate() !== date)
          }
        })
      })
    } else {
      newTable.forEach(row => {
        Object.keys(row).forEach(key => {
          if(key === datetime) {
            if(value === 1)inviteeSelection.push(key)
            else if(value === 2) inviteeSelection = inviteeSelection.filter(select => select !== datetime)
          }
        })
      })
    }
    newTable = mapInviteeSelectedDateTimes(newTable, inviteeSelection)
    var calStart = new Date(inviteeSelection[0])
    var calEnd = new Date(calStart)
    calEnd.setMinutes(calEnd.getMinutes() + parseInt(this.state.window))
    this.setState({
      table: newTable,
      inviteeSelection: inviteeSelection,
      calStart: calStart,
      calEnd: calEnd,
    })
  }

  weekButtonHandler = next => {
    var vw = this.state.viewportWidth
    var start = this.state.dates[0]
    var end = this.state.dates[6]
    var mobileTable = this.state.mobileTable
    var selection = this.state.selection
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
      var tables = fillCurrentTimes(dates, times)
      var table = mapSelectedDateTimes(tables[0], selection)
      this.setState({
        dates: dates,
        table: table,
        mobileTable: tables[1],
      })
      return
    }
    tables = fillCurrentTimes(dates, times)
    table = mapSelectedDateTimes(tables[0], selection)
    this.setState({
      dates: dates,
      table: table,
    })
  }

  inviteeDetailsHandler = (e) => {
    var id = e.target.id
    var value = e.target.value
    if(id === "inviteeName") {
      this.setState({
        inviteeName: value
      })
    } else if(id === "inviteeEmail") {
      this.setState({
        inviteeEmail: value
      })
    } else {
      this.setState({
        inviteeNumber: value
      })
    }
  }

  confirmTimes = () => {
    var selection = this.state.selection
    var newSelection = []
    var id = this.props.id
    var usersapi = backend_url + id
    var meetingsapi = backend_url + 'meeting'
    var inviteeSelection = this.state.inviteeSelection
    selection.forEach(datetime => {
      if(!inviteeSelection.includes(datetime)) {
        newSelection.push(datetime)
      }
    })
    var body = {
      "keyval": {
        "state": {
          "selection" : newSelection
        }
      }
    }
    fetch(usersapi, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        console.log("Put:", data)
      })
    body = {
      "meeting": {
        eventTitle: this.state.eventTitle,
        yourEmail: this.state.yourEmail,
        yourName: this.state.yourName,
        inviteeName: this.state.inviteeEmail,
        inviteeEmail: this.state.inviteeEmail,
        inviteeNumber: this.state.inviteeNumber,
        calStart: this.state.calStart,
        calEnd: this.state.calEnd,
      }
    }
    fetch(meetingsapi, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        console.log("Posted meeting:", data)
      })
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
    console.log("inviteepage's state", this.state)
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
              <InviteeTopBar inviteeDetailsHandler={this.inviteeDetailsHandler}/>
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
                <Link to={{
                  pathname: `/confirmed/${this.props.id}`,
                  data: {
                    "calStart": this.state.calStart,
                    "calEnd": this.state.calEnd,
                    "eventTitle": this.state.eventTitle,
                    "inviteeName": this.state.inviteeName,
                    "inviteeEmail": this.state.inviteeEmail,
                    "inviteeNumber": this.state.inviteeNumber,
                    "id": this.props.id,
                  }
                  }}>
                    <button className="create_event"
                        onClick={() => this.confirmTimes()}>
                      Confirm times
                    </button>
                </Link>
              </div>
              <Creds />
          </div>) : <Loader />
  }
}

export default InviteePage
