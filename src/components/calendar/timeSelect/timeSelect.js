import React, { Component } from 'react'

const TableColumn = (props) => {
  console.log(props.times)
  return(
  props.times.map((dateTime, index) => {
    var dateTimeObj = new Date(dateTime)
    var hour = dateTimeObj.getHours()
    var min = dateTimeObj.getMinutes()
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return(
    <tr className="TimeSlot_col">
      <td className="TimeSlot_time" key={index}>
        {`${hour}${ampm}`}
      </td>
      {(min !== 0) && 
      <td className="TimeSlot_time" key={index+10}>
        {`${min}`}
      </td>}
    </tr> )
  }))
}

export default class TimeSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      window: 15,
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
      ]
    }
  }

  componentDidMount() {
    let table = []
    let dates = [...this.state.dates]
    let times = [...this.state.times]
    dates.forEach((date) => {
      times.forEach((time) => {
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

  render() {
    let times = [...this.state.table]
    return (
      <div className="TimeSelect">
        <div className="TimeSelect_containTitle">
          <h1 className="TimeSelect_title">When is good?</h1>
        </div>
        <table className="TimeSlot">
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
          <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
          <tr className="TimeSlot_col">
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
            <td className="TimeSlot_time">
              :30
            </td>
            <td className="TimeSlot_time">
              6am
            </td>
          </tr>
        </table>
      </div>
    )
  }
}


