import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { throttle } from 'throttle-debounce'
import 'moment-timezone'
import moment from 'moment'

import InviteeTopBar from 'components/topBar/InviteeTopBar'
import Calendar from 'components/calendar/Calendar'
import Creds from 'components/Creds'
import 'SASS/main.scss'
import CalendarIcon from 'components/calendar/CalendarIcon'
import WeekDays from 'components/calendar/weekSelect/weekDays/WeekDays'
import WeekSelect from 'components/calendar/weekSelect/WeekSelect'
import Loader from 'components/calendar/Loader'

import {
  getPreviousNextWeek,
  getPreviousNextDay,
  convertToAppDates,
  getInitTimes,
  convertToStdDates,
  fillCurrentTimes,
  mapSelectedDateTimes,
  mapInviteeSelectedDateTimes,
  convertBetweenTimezones,
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
      prevInviteeTimezone: 'America/Chicago',
      inviteeTimezone: 'America/Chicago',
      timezone: '',
      calStart: '',
      calEnd: '',
      error: false,
      emailLabel: 'Email',
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    })
  }

  componentWillMount() {
    var id = this.props.id
    var currentUserTimezone = moment.tz.guess();
    if(typeof currentUserTimezone === undefined)
    {
      currentUserTimezone = 'America/Vancouver'
    }
    this.getCalendarEvent(id).then(state => {
      state['viewportWidth'] = window.innerWidth
      var table = mapSelectedDateTimes(state.table, state.selection)
      state.table = table
      state.inviteeTimezone = currentUserTimezone
      state.prevInviteeTimezone = state.timezone
      var newSelection = state.selection
      var newTable = state.table
      if(currentUserTimezone !== state.timezone) {
        newSelection = []
        newTable = []
        state.selection.map(element => {
          var newElement = convertBetweenTimezones(element, state.prevInviteeTimezone, state.inviteeTimezone)
          return newSelection.push(newElement.format("MMMM D, YYYY H:mm"))
        })
        state.table.map(row => {
          var newRow = {}
          Object.keys(row).forEach(key => {
            newSelection.includes(key) ? newRow[key] = 1 : newRow[key] = 0
          })
          return newTable.push(newRow)
        })
      }
      console.log(newSelection)
      state.table = newTable
      state.selection = newSelection
      state.prevInviteeTimezone = state.inviteeTimezone
      this.setState(state)
    }).catch( error => {
      this.setState({
        error: true
      })}
    )
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

  inviteeDetailsHandler = (e, emailLabel) => {
    var id = e.target.id
    var value = e.target.value
    if(id === "inviteeName") {
      this.setState({
        inviteeName: value
      })
    } else if(id === "inviteeEmail") {
      this.setState({
        inviteeEmail: value,
        emailLabel: emailLabel
      })
    } else {
      this.setState({
        inviteeNumber: value
      })
    }
  }

  onInviteeTimezoneChange = event => {
    var inviteeTimezone = event.target.value
    var prevInviteeTimezone = this.state.prevInviteeTimezone
    var table = this.state.table
    var newSelection = []
    var newTable = []
    this.state.selection.map(element => {
      var newElement = convertBetweenTimezones(element, prevInviteeTimezone, inviteeTimezone)
      return newSelection.push(newElement.format("MMMM D, YYYY H:mm"))
    })
    table.map(row => {
      var newRow = {}
      Object.keys(row).forEach(key => {
        newSelection.includes(key) ? newRow[key] = 1 : newRow[key] = 0
      })
      return newTable.push(newRow)
    })
    this.setState({
      table: newTable,
      selection: newSelection,
      prevInviteeTimezone: inviteeTimezone,
      inviteeTimezone: inviteeTimezone,
    })
  }

  confirmTimes = () => {
    var selection = this.state.selection
    var timezone = this.state.timezone
    var inviteeTimezone = this.state.inviteeTimezone
    var table = this.state.table
    var newSelection = []
    var newTable = []
    selection.map(element => {
      var newElement = convertBetweenTimezones(element, inviteeTimezone, timezone)
      return newSelection.push(newElement.format("MMMM D, YYYY H:mm"))
    })
    table.map(row => {
      var newRow = {}
      Object.keys(row).forEach(key => {
        newSelection.includes(key) ? newRow[key] = 1 : newRow[key] = 0
      })
      return newTable.push(newRow)
    })
    var id = this.props.id
    var usersapi = backend_url + id
    var meetingsapi = backend_url + 'meeting'
    var inviteeSelection = this.state.inviteeSelection
    var newInviteeSelect = convertBetweenTimezones(inviteeSelection[0], inviteeTimezone, timezone)
    inviteeSelection = []
    inviteeSelection.push(newInviteeSelect.format("MMMM D, YYYY H:mm"))
    var calStart = new Date(inviteeSelection[0])
    var calEnd = new Date(calStart)
    calEnd.setMinutes(calEnd.getMinutes() + parseInt(this.state.window))
    selection = []
    newSelection.forEach(datetime => {
      if(!inviteeSelection.includes(datetime)) {
        selection.push(datetime)
      }
    })
    var body = {
      "keyval": {
        "state": {
          "selection" : selection
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
        inviteeName: this.state.inviteeName,
        inviteeEmail: this.state.inviteeEmail,
        inviteeNumber: this.state.inviteeNumber,
        calStart: calStart,
        calEnd: calEnd,
        inviteeTimezone: this.state.inviteeTimezone,
        timezone: this.state.timezone,
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
      }).catch(error => {
        console.log(error)
        this.setState({
          error: true
        })
      })
  }

  render() {
    console.log("inviteepage's state", this.state)
    const { dates, inviteeName, inviteeEmail, inviteeSelection, emailLabel } = this.state
    const enabled = inviteeName.length > 0 && inviteeEmail.length > 0 && inviteeSelection.length > 0 && emailLabel === 'Email'
    const error = this.state.error
    return error? <Redirect to='/error' /> : dates.length ? (
        <div ref={this.viewportWidthRef} className="App">
              <div className="bar">
                <div className="brand">
                  <CalendarIcon />
                  <div className="brand-title">
                    <h1 className="brand-title-text">I'm Free FYI</h1>
                  </div>
                </div>
              </div>
              <InviteeTopBar inviteeDetailsHandler={this.inviteeDetailsHandler}
                             inviteeTimezone = {this.state.inviteeTimezone}
                             onInviteeTimezoneChange = {this.onInviteeTimezoneChange}
                             emailLabel = {this.state.emailLabel}/>
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
                creatorTimezone={this.state.timezone}
                inviteeTimezone={this.state.inviteeTimezone}
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
                    "id": this.props.id,
                  }
                  }}>
                    <button className="create_event"
                        type="button"
                        disabled={!enabled}
                        onClick={() => this.confirmTimes()}>
                      confirm times
                    </button>
                </Link>
              </div>
              <Creds />
          </div>) : <Loader />
  }
}

export default InviteePage
