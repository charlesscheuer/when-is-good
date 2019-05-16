import React, { Component } from 'react'
import { throttle } from 'throttle-debounce'
import { Route } from 'react-router-dom'
import TopBar from './topBar/TopBar'
import Calendar from './calendar/Calendar'
import Creds from './Creds'
import '../SASS/main.scss'
import CalendarIcon from './calendar/CalendarIcon'
import WeekDays from './calendar/weekSelect/weekDays/WeekDays'
import CreateEvent from './OtherRoutes/CreateEvent'
import WeekSelect from './calendar/weekSelect/WeekSelect'
import { getPreviousNextWeek,
         convertToAppDates } from '../lib/library.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: 30,
      dates: [
        'April 4, 2019',
        'April 5, 2019',
        'April 6, 2019',
        'April 7, 2019',
        'April 8, 2019',
        'April 9, 2019',
        'April 10, 2019'
      ],
      times: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      table: [],
      selected: [],
      viewportWidth: 800,
      // the stuff below here is being set by the range from '/create'
      // it should be passed here to be used in TimeSelect.js
      value: [22, 62],
      startTime: '9 am',
      endTime: '5 pm'
      // 👆provides day of week for the single column mobile view
    }
    this.onClick = this.onClick.bind(this)
    this.onSelectWindow = this.onSelectWindow.bind(this)
    this.resetSelection = this.resetSelection.bind(this)
  }

  fillCurrentTimes() {
    let table = []
    let timewindows = []
    let dates = [...this.state.dates]
    let times = [...this.state.times]
    times.forEach(time => {
      timewindows.push(`${time}:00`)
      timewindows.push(`${time}:15`)
      timewindows.push(`${time}:30`)
      timewindows.push(`${time}:45`)
    })
    timewindows.forEach(time => {
      var row = []
      dates.forEach(date => {
        row.push([`${date} ${time}`, false])
      })
      table.push(row)
    })
    this.setState({
      table: table
    })
  }

  resetSelection(table) {
    table.map(row => {
      row.map(datetime => {
        datetime[1] = false
        return datetime
      })
      return row
    })
    return table
  }

  betweenTimes = value => {
    // this function determines the times to show the user as they set using the range input

    // 0 should be 5 am, 50 should be 12 pm,  and 100 is 11pm
    // START TIMES:
    // let times = {
    //   '0': '5 am',
    //   '5': '6 am',
    //   '10': '7 am',
    //   '15': '8 am',
    //   '20': '9 am',
    //   '25': '10 am',
    //   '30': '11 am',
    //   '35': '12 pm',
    //   '40': '1 pm',
    //   '45': '2 pm',
    //   '50': '3 pm',
    //   '55': '4 pm',
    //   '60': '5 pm',
    //   '65': '6 pm',
    //   '70': '7 pm',
    //   '75': '8 pm',
    //   '80': '9 pm',
    //   '85': '10 pm',
    //   '90': '11 pm'
    // }
    // this.setstate(times.map[lowerValue])
    if (value[0] < 5) {
      this.setState({ startTime: '5 am' })
    } else if (value[0] >= 5 && value[0] < 10) {
      this.setState({ startTime: '6 am' })
    } else if (value[0] >= 10 && value[0] < 15) {
      this.setState({ startTime: '7 am' })
    } else if (value[0] >= 15 && value[0] < 20) {
      this.setState({ startTime: '8 am' })
    } else if (value[0] >= 20 && value[0] < 25) {
      this.setState({ startTime: '9 am' })
    } else if (value[0] >= 25 && value[0] < 30) {
      this.setState({ startTime: '10 am' })
    } else if (value[0] >= 30 && value[0] < 35) {
      this.setState({ startTime: '11 am' })
    } else if (value[0] >= 35 && value[0] < 40) {
      this.setState({ startTime: '12 pm' })
    } else if (value[0] >= 40 && value[0] < 45) {
      this.setState({ startTime: '1 pm' })
    } else if (value[0] >= 45 && value[0] < 50) {
      this.setState({ startTime: '2 pm' })
    } else if (value[0] >= 50 && value[0] < 55) {
      this.setState({ startTime: '3 pm' })
    } else if (value[0] >= 55 && value[0] < 60) {
      this.setState({ startTime: '4 pm' })
    } else if (value[0] >= 60 && value[0] < 65) {
      this.setState({ startTime: '5 pm' })
    } else if (value[0] >= 65 && value[0] < 70) {
      this.setState({ startTime: '6 pm' })
    } else if (value[0] >= 70 && value[0] < 75) {
      this.setState({ startTime: '7 pm' })
    } else if (value[0] >= 75 && value[0] < 80) {
      this.setState({ startTime: '8 pm' })
    } else if (value[0] >= 80 && value[0] < 87) {
      this.setState({ startTime: '9 pm' })
    } else if (value[0] >= 87 && value[0] < 95) {
      this.setState({ startTime: '10 pm' })
    } else if (value[0] >= 95 && value[0] < 100) {
      this.setState({ startTime: '11 pm' })
    }
    if (value[1] < 5) {
      this.setState({ endTime: '5 am' })
    } else if (value[1] >= 5 && value[1] < 10) {
      this.setState({ endTime: '6 am' })
    } else if (value[1] >= 10 && value[1] < 15) {
      this.setState({ endTime: '7 am' })
    } else if (value[1] >= 15 && value[1] < 20) {
      this.setState({ endTime: '8 am' })
    } else if (value[1] >= 20 && value[1] < 25) {
      this.setState({ endTime: '9 am' })
    } else if (value[1] >= 25 && value[1] < 30) {
      this.setState({ endTime: '10 am' })
    } else if (value[1] >= 30 && value[1] < 35) {
      this.setState({ endTime: '11 am' })
    } else if (value[1] >= 35 && value[1] < 40) {
      this.setState({ endTime: '12 pm' })
    } else if (value[1] >= 40 && value[1] < 45) {
      this.setState({ endTime: '1 pm' })
    } else if (value[1] >= 45 && value[1] < 50) {
      this.setState({ endTime: '2 pm' })
    } else if (value[1] >= 50 && value[1] < 55) {
      this.setState({ endTime: '3 pm' })
    } else if (value[1] >= 55 && value[1] < 60) {
      this.setState({ endTime: '4 pm' })
    } else if (value[1] >= 60 && value[1] < 65) {
      this.setState({ endTime: '5 pm' })
    } else if (value[1] >= 65 && value[1] < 70) {
      this.setState({ endTime: '6 pm' })
    } else if (value[1] >= 70 && value[1] < 75) {
      this.setState({ endTime: '7 pm' })
    } else if (value[1] >= 75 && value[1] < 80) {
      this.setState({ endTime: '8 pm' })
    } else if (value[1] >= 80 && value[1] < 87) {
      this.setState({ endTime: '9 pm' })
    } else if (value[1] >= 87 && value[1] < 95) {
      this.setState({ endTime: '10 pm' })
    } else if (value[1] >= 95 && value[1] < 100) {
      this.setState({ endTime: '11 pm' })
    }
  }

  onSliderChange = value => {
    // this changes the state of the value array when user drags the range component from '/create'
    this.setState({
      value
    })
    this.betweenTimes(value)
  }

  onSelectWindow(value) {
    if (value === 1) {
      var table = this.state.table
      table = this.resetSelection(table)
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

  onClick(e, x, y) {
    e.preventDefault()
    var table = this.state.table
    var newTable = []
    if (this.state.window === 1) {
      table.forEach((row, xx) => {
        var newRow = []
        row.forEach((datetime, yy) => {
          if (yy === y) newRow.push([datetime[0], true])
          else newRow.push([datetime[0], datetime[1]])
        })
        newTable.push(newRow)
      })
    } else {
      newTable = table
      var newvar = table[x][y]
      newvar[1] = !newvar[1]
      newTable[x][y] = newvar
    }
    this.setState({
      table: newTable
    })
  }

  initWindow() {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth })
  }

  componentWillMount() {
    this.fillCurrentTimes()
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

  weekButtonHandler = nextWeek => {
    var start = this.state.dates[0]
    var end = this.state.dates[6]
    if(nextWeek)
      var week = getPreviousNextWeek(end, nextWeek)
    else
      week = getPreviousNextWeek(start, nextWeek)
    week = convertToAppDates(week)
    this.setState({
      dates: week
    })
    console.log(this.state.dates)
  }

  render() {
    return (
      <div>
        <Route
          path="/create"
          exact
          render={() => (
            <CreateEvent
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              value={this.state.value}
              onSliderChange={this.onSliderChange}
            />
          )}
        />
        <Route
          path="/"
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
              <TopBar onSelectWindow={this.onSelectWindow} />
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
              <Calendar
                dates={this.state.dates}
                window={this.state.window}
                table={this.state.table}
                onClick={this.onClick}
                vw={this.state.viewportWidth}
              />
              <Creds />
            </div>
          )}
        />
      </div>
    )
  }
}

export default App
