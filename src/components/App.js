import React, { Component } from 'react'
import TopBar from './topBar/topBar'
import Calendar from './Calendar/Calendar'
import Creds from './Creds'
import '../SASS/main.scss'
import CalendarIcon from './Calendar/CalendarIcon'
import WeekDays from './Calendar/WeekSelect/WeekDays/WeekDays'
import WeekSelect from './Calendar/WeekSelect/WeekSelect'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: 1,
      dates: [
        'April 4, 18',
        'April 5, 18',
        'April 6, 18',
        'April 7, 18',
        'April 8, 18',
        'April 9, 18',
        'April 10, 18'
      ],
      times: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      table: [],
    }
    this.onClick = this.onClick.bind(this)
    this.onSelectWindow = this.onSelectWindow.bind(this)
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

  onSelectWindow(value) {
    this.setState({
      ...this.state,
      window: value
    })
  }

  onClick(e, x, y) {
    e.preventDefault()
    var table = this.state.table
    var newTable = []
    if(this.state.window === 1) {
      table.forEach((row, xx) => {
        var newRow = []
        row.forEach((datetime, yy) => {
          if(yy === y) newRow.push([datetime[0], true])
          else newRow.push([datetime[0], datetime[1]])
        })
        newTable.push(newRow)
      })
    }
    else {
      newTable = table
      var newvar = table[x][y]
      newvar[1] = !newvar[1]
      newTable[x][y] = newvar
    }
    this.setState({
      table: newTable
    })
  }

  componentWillMount() {
    this.fillCurrentTimes()
  }

  render() {
    return (
      <div className="App">
        <TopBar onSelectWindow={this.onSelectWindow} />
        <div className="bar">
          <div className="brand">
            <CalendarIcon />
            <div className="brand-title">
              <h1 className="brand-title-text">I'm Free FYI</h1>
            </div>
          </div>
        </div>
        <WeekSelect />
        <WeekDays className="stickyScroll" />
        <Calendar
          window={this.state.window}
          table={this.state.table}
          onClick={this.onClick}
        />
        <Creds />
      </div>
    )
  }
}

export default App
