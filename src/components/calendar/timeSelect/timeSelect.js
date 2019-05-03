import React, { Component } from 'react'
export default class TimeSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      window: 0,
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
      ]
    }
    this.windowHandler = this.windowHandler.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  windowHandler() {
    let table = []
    let dates = [...this.state.dates]
    let times = [...this.state.times]
    times.forEach((time) => {
      dates.forEach((date) => {
        table.push(`${date} ${time}:00`)
        switch(this.state.window) {
          case 15:
            table.push(`${date} ${time}:15`)
            table.push(`${date} ${time}:30`)
            table.push(`${date} ${time}:45`)
            break;
          case 30:
            table.push(`${date} ${time}:30`)
            break;
          default:
            break;
        }
      })
    })
    this.setState({table: table})
  }

  onClick(e, datetime) {
    e.preventDefault()
    this.setState({
      ...this.state,
      selected: [
        ...this.state.selected,
        datetime
      ]
    })
    console.log(this.state.selected)
  }

  componentDidMount() {
    this.windowHandler()
  }

  render() {
    let times = [...this.state.table]
    return (
      <div className="TimeSelect">
        <div className="TimeSelect_containTitle">
          <h1 className="TimeSelect_title">When is good?</h1>
        </div>
        <table className="TimeSlot">
          <tbody className="TimeSlot_col">
            {times.map((datetime, index) => {
              var dateTimeObj = new Date(datetime)
              var hour = dateTimeObj.getHours()
              var min = dateTimeObj.getMinutes()
              var ampm = hour >= 12 ? 'pm' : 'am';
              hour = hour % 12;
              hour = hour ? hour : 12;
              return <tr key={index}>
                <td draggable="true" onClick={(e) => this.onClick(e, datetime)} className="TimeSlot_time" key={index}>
                  {min === 0 ? `${hour}${ampm}`: `${hour}:${min}${ampm}`}
                </td>
              </tr>})
            }
          </tbody>
        </table>
      </div>
    )
  }
}


