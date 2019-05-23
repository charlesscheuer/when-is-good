import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import EmailIncluded from './EmailIncluded';
import Slider from 'rc-slider';
import CalendarIcon from '../calendar/CalendarIcon';
import Creds from '../Creds';
const Range = Slider.Range;

export default class CreateEvent extends Component {
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
          This meeting will occur between {this.props.startTime} and{' '}
          {this.props.endTime}. Drag the slider below to adjust the times you
          would like to meet between.
        </p>
        <div className="create_range">
          <Range
            allowCross={false}
            value={this.props.value}
            onChange={this.props.onSliderChange}
          />
        </div>
        <div className="create_timezone">
          <p className="create_timezone_label">
            What time zone would you like the times to be displayed in?
          </p>
          <select
            className="create_timezone_selection"
            onChange={this.props.onTimezoneChange}
            value={this.props.timezone}
          >
            <option className="create_timezone_selection-option" value="PST">
              PST
            </option>
            <option className="create_timezone_selection-option" value="MST">
              MST
            </option>
            <option className="create_timezone_selection-option" value="EST">
              EST
            </option>
          </select>
        </div>
        <div className="create_shouldEmail">
          <p className="create_shouldEmail_label">
            Do you want to email the group with a link to the best times? If
            not, you can just copy the link we provide and send it yourself.
          </p>
          <div>
            <Toggle
              defaultChecked={this.props.shouldEmail}
              onChange={this.props.handleEmailToggle}
            />
          </div>
        </div>
        {this.props.shouldEmail ? <EmailIncluded
                                    yourEmail={this.props.yourEmail}
                                    theirEmails={this.props.theirEmails}
                                    numPeople={this.props.numPeople}
                                    emailHandler={this.props.emailHandler} /> : null}
        <Link to="/create">
          <button
            onClick={() => this.props.createdEvent()}
            className="create_event"
          >
            Create Event
          </button>
        </Link>
        <Creds />
      </div>
    );
  }
}
