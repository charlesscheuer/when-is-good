import React, { Component } from 'react'
import Toggle from 'react-toggle'
import Slider from 'rc-slider'

import EmailIncluded from './EmailIncluded'
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
      value: [0, 100]
    }
  }

  handleEmailToggle = () => {
    this.setState({ shouldEmail: !this.state.shouldEmail })
  }

  onLowerBoundChange = e => {
    this.setState({ lowerBound: +e.target.value })
  }
  onUpperBoundChange = e => {
    this.setState({ upperBound: +e.target.value })
  }
  onSliderChange = value => {
    this.setState({
      value
    })
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
          This meeting will occur between 9am and 5pm. Drag the slider below to
          adjust the times you would like to meet between.
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
