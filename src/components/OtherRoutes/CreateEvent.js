import React, { Component } from 'react'
import Toggle from 'react-toggle'
import EmailIncluded from './EmailIncluded'
import Slider from 'rc-slider'
import CalendarIcon from '../calendar/CalendarIcon'
import Creds from '../Creds'
const Range = Slider.Range

export default class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldEmail: false,
      numPeople: 2,
      theirEmails: [''],
      value: [10, 100],
      startTime: '7 am',
      endTime: '8 pm'
    }
  }

  onSliderChange = value => {
    this.setState({
      value
    })
    console.log(value)
    this.betweenTimes(value)
  }

  betweenTimes = value => {
    // 0 should be 5 am, 50 should be 12 pm,  and 100 is 11pm
    // START TIMES:
    for (let i = 0; i < 100; i + 5) {
      if (i < 5) {
        if (value[0] < 5) {
          this.setState({ startTime: '5 am' })
        }
      } else {
        // equals 5 in the first case
        if (value[0] >= i && value[0] < i + 5) {
          this.setState({ startTime: '6 am' })
        }
      }
    }
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
  }

  handleEmailToggle = () => {
    this.setState({ shouldEmail: !this.state.shouldEmail })
  }

  render() {
    return (
      <div className="create">
        <div className="create_brand">
          <CalendarIcon />
          <h1 className="create_brand_title">I'm Free FYI</h1>
        </div>
        <h1 className="create_title">Create an event</h1>
        <p className="create_subtext">
          No signup necessary. We create a custom link, but you can click here
          to email everyone when the entire group has posted its best times.
        </p>
        <p className="create_instruction">
          We just need a little bit of information from you before we get
          started:
        </p>
        <p className="create_subtext">
          This meeting will occur between {this.state.startTime} and 5pm. Drag
          the slider below to adjust the times you would like to meet between.
        </p>
        <div className="create_range">
          <Range
            allowCross={false}
            value={this.state.value}
            onChange={this.onSliderChange}
          />
        </div>

        <div className="create_shouldEmail">
          <p className="create_shouldEmail_label">
            Do you want to email the group with a link to the best times? If
            not, you can just copy the link we provide and send it yourself.
          </p>
          <div>
            <Toggle
              defaultChecked={this.state.shouldEmail}
              onChange={this.handleEmailToggle}
            />
          </div>
        </div>
        {this.state.shouldEmail ? <EmailIncluded /> : null}
        <button className="create_event">Create Event</button>
        <Creds />
      </div>
    )
  }
}
