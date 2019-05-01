import React, { Component } from 'react'

export default class TimeSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      times: [
        "April 4, 18 00:00",
        "April 4, 18 00:30",
        "April 4, 18 01:00",
        "April 4, 18 01:30",
        "April 4, 18 02:00",
        "April 4, 18 02:30",
        "April 4, 18 03:00",
        "April 5, 18 00:00",
        "April 5, 18 00:30",
        "April 5, 18 01:00",
        "April 5, 18 01:30",
        "April 5, 18 02:00",
        "April 5, 18 02:30",
        "April 5, 18 03:00",
        "April 6, 18 00:00",
        "April 6, 18 00:30",
        "April 6, 18 01:00",
        "April 6, 18 01:30",
        "April 6, 18 02:00",
        "April 6, 18 02:30",
        "April 6, 18 03:00",
        "April 7, 18 00:00",
        "April 7, 18 00:30",
        "April 7, 18 01:00",
        "April 7, 18 01:30",
        "April 7, 18 02:00",
        "April 7, 18 02:30",
        "April 7, 18 03:00",
        "April 8, 18 00:00",
        "April 8, 18 00:30",
        "April 8, 18 01:00",
        "April 8, 18 01:30",
        "April 8, 18 02:00",
        "April 8, 18 02:30",
        "April 8, 18 03:00",
        "April 9, 18 00:00",
        "April 9, 18 00:30",
        "April 9, 18 01:00",
        "April 9, 18 01:30",
        "April 9, 18 02:00",
        "April 9, 18 02:30",
        "April 9, 18 03:00",
        "April 10, 18 00:00",
        "April 10, 18 00:30",
        "April 10, 18 01:00",
        "April 10, 18 01:30",
        "April 10, 18 02:00",
        "April 10, 18 02:30",
        "April 10, 18 03:00",
      ]
    }
  }
  render() {
    let times = [...this.state.times]
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


