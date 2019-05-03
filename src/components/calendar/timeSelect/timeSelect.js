import React, { Component } from 'react'
export default class TimeSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      window: 60,
      dates: [
        "April 4, 18",
        "April 5, 18",
        "April 6, 18",
        "April 7, 18",
        "April 8, 18",
        "April 9, 18",
        "April 10, 18",
      ],
      times: [
        6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20
      ],
      table: [
      ],
      selected: [
      ],
    }
    this.windowHandler = this.windowHandler.bind(this)
    this.displayHandler = this.displayHandler.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  displayHandler(datetime) {
    var dateTimeObj = new Date(datetime)
    var hour = dateTimeObj.getHours()
    var min = dateTimeObj.getMinutes()
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    if(min === 0)
      return `${hour}${ampm}`
    return `${hour}:${min}${ampm}`
  }

  windowHandler() {
    let table = []
    let timewindows = []
    let dates = [...this.state.dates]
    let times = [...this.state.times]
    times.forEach((time) => {
      timewindows.push(`${time}:00`)
      switch(this.state.window) {
        case 15:
          timewindows.push(`${time}:15`)
          timewindows.push(`${time}:30`)
          timewindows.push(`${time}:45`)
          break;
        case 30:
          timewindows.push(`${time}:30`)
          break;
        default:
          break;
      }
    })
    timewindows.forEach((time) => {
      var row = []
      dates.forEach((date) => {
        row.push([`${date} ${time}`, false])
      })
      table.push(row)
    })
    this.setState({
      table: table
    })
  }

  onClick(e, x, y) {
    e.preventDefault()
    var table = this.state.table
    this.setState({
      ...this.state,
      selected: [
        ...this.state.selected,
        table[x][y][0]
      ]
    })
    var newvar = table[x][y]
    newvar[1] = !newvar[1]
    table[x][y] = newvar
    this.setState({
      table: table
    })
  }

  componentDidMount() {
    this.windowHandler()
  }

  render() {
    console.log("Selected:")
    console.log(this.state.selected)
    let times = [...this.state.table]
    return (
      <div className="TimeSelect">
        <div className="TimeSelect_containTitle">
          <h1 className="TimeSelect_title">When is good?</h1>
        </div>
        <table className="TimeSlot">
          <tbody className="TimeSlot_col">
            {times.map((row, x) => {
              return <tr key={x}> 
                {row.map((datetime, y) => {
                  return <td className="TimeSlot_time"
                             draggable="true"
                             onClick={(e) => this.onClick(e, x, y)}
                             key={x+y}>
                          {this.displayHandler(datetime[0])}
                         </td>
                  })
                }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}