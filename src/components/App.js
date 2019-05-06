import React, { Component } from 'react'
import TopBar from './topBar/topBar'
import Calendar from './Calendar/Calendar'
import '../SASS/main.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: 60,
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
      selected: []
    }
    this.windowHandler = this.windowHandler.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSelectWindow = this.onSelectWindow.bind(this)
  }

  windowHandler(window) {
    let table = []
    let timewindows = []
    let dates = [...this.state.dates]
    let times = [...this.state.times]
    times.forEach(time => {
      timewindows.push(`${time}:00`)
      switch (window) {
        case 15:
          timewindows.push(`${time}:15`)
          timewindows.push(`${time}:30`)
          timewindows.push(`${time}:45`)
          break
        case 30:
          timewindows.push(`${time}:30`)
          break
        case 45:
          timewindows.push(`${time}:45`)
          break
        default:
          break
      }
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
    this.windowHandler(value)
  }

  onClick(e, x, y) {
    e.preventDefault()
    var table = this.state.table
    this.setState({
      ...this.state,
      selected: [...this.state.selected, table[x][y][0]]
    })
    var newvar = table[x][y]
    newvar[1] = !newvar[1]
    table[x][y] = newvar
    this.setState({
      table: table
    })
    console.log(this.state.selected)
  }

  componentWillMount() {
    this.windowHandler(this.state.window)
  }

  render() {
    return (
      <div className="App">
        <TopBar onSelectWindow={this.onSelectWindow} />
        <Calendar
          selected={this.state.selected}
          table={this.state.table}
          onClick={this.onClick}
        />
      </div>
    )
  }
}

export default App
