import React, { Component } from 'react'
import { Link, Redirect, Switch } from 'react-router-dom'
import { throttle } from 'throttle-debounce'
import { Route } from 'react-router-dom'
import TopBar from './topBar/TopBar'
import Calendar from './calendar/Calendar'
import Creds from './Creds'
import CalendarIcon from './calendar/CalendarIcon'
import WeekDays from './calendar/weekSelect/weekDays/WeekDays'
import CreateEvent from './OtherRoutes/CreateEvent'
import WeekSelect from './calendar/weekSelect/WeekSelect'
import EventCreated from './OtherRoutes/EventCreated'
import InviteeConfirmed from './OtherRoutes/InviteeConfirmed'
import InviteePage from './OtherRoutes/InviteePage'
import Error from './OtherRoutes/Error'
import '../SASS/main.scss'
import {
  getPreviousNextWeek,
  getPreviousNextDay,
  convertToAppDates,
  getInitDate,
  getInitTimes,
  convertToStdDates,
  fillCurrentTimes,
  resetSelection,
  mapSelectedDateTimes,
} from '../lib/library.js'
import { backend_url } from '../lib/controller.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: 30,
      dates: [],
      times: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      table: [],
      selection: [],
      mobileTable: [],
      viewportWidth: 800,
      // Pass the below to <CreateEvent>
      value: [22, 62],
      startTime: '9 am',
      endTime: '5 pm',
      timezone: 'PST',
      shouldEmail: false,
      yourEmail: '',
      yourName: '',
      theirEmails: [''],
      numPeople: 2,
      eventCode: '',
      eventTitle: '',
      error: false,
    }
  }

  componentWillMount() {
    let dates = getInitDate()
    var times = getInitTimes(this.state.startTime, this.state.endTime)
    var tables = fillCurrentTimes(dates, times)
    this.setState({
      dates: dates,
      times: times,
      table: tables[0],
      mobileTable: tables[1],
    })
  }

  componentDidMount() {
    this.updateViewportWidth()
    window.addEventListener('resize', this.updateViewportWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewportWidth)
  }

  initWindow = () => {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth })
  }

  updateViewportWidth = () => {
    throttle(this.initWindow(), 500)
  }

  onSliderChange = value => {
    // this changes the state of the value array when user drags the range component from '/create'
    this.setState({
      value
    })
    let timesMap = {
      '0-4': '5 am',
      '5-9': '6 am',
      '10-14': '7 am',
      '15-19': '8 am',
      '20-24': '9 am',
      '25-29': '10 am',
      '30-34': '11 am',
      '35-39': '12 pm',
      '40-44': '1 pm',
      '45-49': '2 pm',
      '50-54': '3 pm',
      '55-59': '4 pm',
      '60-64': '5 pm',
      '65-69': '6 pm',
      '70-74': '7 pm',
      '75-79': '8 pm',
      '80-86': '9 pm',
      '87-94': '10 pm',
      '95-100': '11 pm'
    }
    for (var key in timesMap) {
      var range = key.split('-')
      var val = timesMap[key]
      if (value[0] >= range[0] && value[0] < range[1]) {
        this.setState({ startTime: val })
      }
      if (value[1] >= range[0] && value[1] < range[1]) {
        this.setState({ endTime: val })
      }
    }
  }

  handleEmailToggle = () => {
    this.setState({
      shouldEmail: !this.state.shouldEmail
    })
    setTimeout(() => {
      if (this.state.shouldEmail) {
        window.scrollTo(0, 1000)
      }
    }, 100)
  }

  onTimezoneChange = event => {
    this.setState({
      timezone: event.target.value
    })
  }

  emailHandler = emailState => {
    this.setState(emailState)
  }

  eventCodeHandler = input => {
    this.setState({
      eventCode: input
    })
  }

  yourNameEmailHandler = e => {
    var id = e.target.id
    var value = e.target.value
    if(id === "yourName") {
      this.setState({
        yourName: value,
        eventTitle: value + '\'s meeting'
      })
    } else {
      this.setState({
        yourEmail: value,
      })
    }
  }

  createdEvent = () => {
    let dates = getInitDate()
    var times = getInitTimes(this.state.startTime, this.state.endTime)
    var tables = fillCurrentTimes(dates, times)
    this.setState({
      dates: dates,
      times: times,
      table: tables[0],
      mobileTable: tables[1],
    })
  }

  onSelectWindow = value => {
    if (value === 1) {
      var table = this.state.table
      table = resetSelection(table)
      this.setState({
        ...this.state,
        table: table,
        window: value,
        selection: [],
      })
    } else {
      this.setState({
        ...this.state,
        window: value
      })
    }
  }

  onTimeSelect = (e, datetime, value) => {
    e.preventDefault()
    var newTable = [...this.state.table]
    var selection = [...this.state.selection]
    if (this.state.window === 1) {
      newTable.forEach(row => {
        var rowObj = convertToStdDates(Object.keys(row))
        Object.keys(row).forEach((key, i) => {
          var date = rowObj[i].getDate()
          if(date === parseInt(datetime)) {
            if(value === 0)selection.push(key)
            else selection = selection.filter(select => new Date(select).getDate() !== date)
          }
        })
      })
    } else {
      newTable.forEach(row => {
        Object.keys(row).forEach(key => {
          if(key === datetime) {
            if(value === 0)selection.push(key)
            else selection = selection.filter(select => select !== datetime)
          }
        })
      })
    }
    newTable = mapSelectedDateTimes(newTable, selection)
    this.setState({
      table: newTable,
      selection: selection,
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
        selection: selection,
      })
      return
    }
    tables = fillCurrentTimes(dates, times)
    table = mapSelectedDateTimes(tables[0], selection)
    this.setState({
      dates: dates,
      table: table,
      selection: selection,
    })
  }

  createCalendarEvent = () => {
    var state = this.state
    var table = this.state.table
    resetSelection(table)
    state.table = table
    var body = { "state" : state }
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
        console.log('Posted state id:', data.id)
        this.setState({eventCode: data.id})
      }.bind(this)).catch(error => {
        console.log(error)
        this.setState({
          error: true
        })
      })
  }

  getCalendarEvent = (id) => {
    var api = backend_url + id
    fetch(api, {
        method: 'GET',
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        var state = JSON.parse(JSON.stringify(data)).data.state
        console.log('Got state:', state)
        this.setState(state)
      }.bind(this)).catch(error => {
        console.log(error)
        this.setState({
          error: true
        })
      })
  }

  render() {
    console.log('current state:', this.state)
    return (
      <div>
        <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <CreateEvent
              value={this.state.value}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              timezone={this.state.timezone}
              shouldEmail={this.state.shouldEmail}
              yourEmail={this.state.yourEmail}
              yourNameEmailHandler={this.yourNameEmailHandler}
              theirEmails={this.state.theirEmails}
              numPeople={this.state.numPeople}
              emailHandler={this.emailHandler}
              onSliderChange={this.onSliderChange}
              createdEvent={this.createdEvent}
              onTimezoneChange={this.onTimezoneChange}
              handleEmailToggle={this.handleEmailToggle}
            />
          )}
        />
        <Route
          path="/create"
          exact
          render={() => (
            this.state.yourEmail.length !== 0 ? (
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
                creatorTimezone={this.state.timezone}
                inviteeTimezone={this.state.timezone}
                dates={this.state.dates}
                mobileTable={this.state.mobileTable}
                window={this.state.window}
                table={this.state.table}
                onTimeSelect={this.onTimeSelect}
                vw={this.state.viewportWidth}
              />
              <div className="create">
                <Link to="/eventcreated">
                  <button className="create_event"
                          type="button"
                          disabled={this.state.selection.length === 0}
                          onClick={() => this.createCalendarEvent()}>
                    Submit times
                  </button>
                </Link>
              </div>
              <Creds />
            </div>) : <Redirect to='/' />
          )}
        />
        <Route
          path="/eventcreated"
          exact
          render={() => <div ref={this.viewportWidthRef} className="App">
                          <EventCreated
                            eventCode={this.state.eventCode}/>
                          </div>}
        />
        <Route
          path="/event/:id"
          exact
          render={(props) => (<InviteePage id={props.match.params.id}/>)}
        />
        <Route
          path="/confirmed/:event"
          render={(props) => <div ref={this.viewportWidthRef} className="App">
              <InviteeConfirmed data={props}/>
            </div>}
        />
        <Route
          path="/error"
          exact
          render={(props) => <div ref={this.viewportWidthRef} className="App">
              <Error data={props}/>
            </div>}
        />
        <Route
          path="/addtime"
          exact
          render={() => (
            <div ref={this.viewportWidthRef} className="App">
              <div className="bar">
                <div className="brand">
                  <CalendarIcon />
                  <div className="brand-title">
                    <h1 className="brand-title-text">I'm Free FYI</h1>
                  </div>
                </div>
              </div>

              {this.state.eventCode === '' ? (
                <div className="create">
                  <p>Please input your code</p>
                  <div className="create_emails_yours">
                    <form className="create_emails_form">
                      <input
                        className="create_emails_form_input"
                        placeholder="Enter the event code"
                        id="email"
                        onChange={this.eventCodeHandler}
                        required
                        type="text"
                      />
                      <label
                        htmlFor="email"
                        className="create_emails_form_input_label"
                      >
                        Enter your event code
                      </label>
                    </form>
                  </div>
                  <button
                    className="create_event"
                    onClick={this.codeSubmission}
                  >
                    Submit code
                  </button>
                </div>
              ) : (
                <div className="create">
                  <h1 className="create_addtime">
                    Add the times that work best for you.
                  </h1>
                </div>
              )}
              {this.state.eventCode === '' ? null : (
                <div className="sticks">
                  <WeekSelect
                    dates={this.state.dates}
                    weekButtonHandler={this.weekButtonHandler}
                    vw={this.state.viewportWidth}
                  />
                  <WeekDays
                    vw={this.state.viewportWidth}
                    dates={this.state.dates}
                    className="stickyScroll"
                  />
                </div>
              )}
              {this.state.eventCode === '' ? null : (
                <Calendar
                  dates={this.state.dates}
                  window={this.state.window}
                  table={this.state.table}
                  onTimeSelect={this.onTimeSelect}
                  vw={this.state.viewportWidth}
                />
              )}
              {this.state.eventCode === '' ? null : (
                <div className="create">
                  <button className="create_event">Submit times</button>
                  {/*onclick to submit the time info here */}
                </div>
              )}
              <Creds />
            </div>
          )}
        />
        <Route render={() => (<Redirect to='/' />)} />
        </Switch>
      </div>
    )
  }
}

export default App
