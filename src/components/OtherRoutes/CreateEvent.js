import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import CalendarIcon from 'components/calendar/CalendarIcon'
import Creds from 'components/Creds'
// TODO: Future Feature
// import Toggle from 'react-toggle';
// import EmailIncluded from './EmailIncluded';

const Range = Slider.Range;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      emailLabel: 'Email',
    }
  }

  render() {
    const { email, name, emailLabel } = this.state
    const enabled = email.length > 0 && name.length > 0 && emailLabel === 'Email'
    return (
      <div className="create">
        <div className="create_brand">
          <CalendarIcon />
          <h1 className="create_brand_title">I'm Free FYI</h1>
        </div>
        <h1 className="create_title">Create a meeting</h1>
        <p className="create_subtext">
          No Signups! Set your availability, Share your personal link,
          Receive meeting confirmation on your email.
        </p>
        <p className="create_instruction">
          We need a little bit of information from you before we get
          started:
        </p>
        <p className="create_subtext">
          This meeting will occur between {this.props.startTime} and{' '}
          {this.props.endTime}. Drag the slider to change.
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
            <option className="create_timezone_selection-option" value="CST">
              CST
            </option>
            <option className="create_timezone_selection-option" value="EST">
              EST
            </option>
          </select>
        </div>
        <div className="create_shouldEmail">
          <p className="create_shouldEmail_label">
          Where do you want meeting confirmation from your invitees delivered?
          </p>
          {/* TODO: Future Feature for group invites */}
          {/* <div>
            <Toggle
              defaultChecked={this.props.shouldEmail}
              onChange={this.props.handleEmailToggle}
            />
          </div> */}
        </div>
        <div className="create_emails">
          <div className="invitee_details">
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Name"
                id="yourName"
                onChange={(e) => {
                  this.setState({
                    name: e.target.value
                  })
                  this.props.yourNameEmailHandler(e)}}
                required
                type="text"
              />
              <label htmlFor="name" className="create_emails_form_input_label">
                Name
              </label>
            </form>
            <form className="create_emails_form">
              <input
                className="create_emails_form_input"
                placeholder="Email"
                id="yourEmail"
                onChange={(e) => {
                  this.setState({
                    email: e.target.value
                  })
                  if(emailRegex.test(String(e.target.value).toLowerCase())) {
                    this.props.yourNameEmailHandler(e)
                    this.setState({
                      emailLabel: "Email"
                    })
                  } else {
                    this.setState({
                      emailLabel: "Invalid Email"
                    })
                  }
                }}
                required
                type="text"
              />
              <label htmlFor="email" className="create_emails_form_input_label">
                {this.state.emailLabel}
              </label>
            </form>
          </div>
        </div>
        {/* TODO: Future Feature for group invites */}
        {/* {this.props.shouldEmail ? <EmailIncluded
                                    yourEmail={this.props.yourEmail}
                                    theirEmails={this.props.theirEmails}
                                    numPeople={this.props.numPeople}
                                    emailHandler={this.props.emailHandler} /> : null} */}
        <Link to="/create">
          <button
            type="button"
            disabled={!enabled}
            onClick={() => this.props.createdEvent()}
            className="create_event"
          >
            set availability
          </button>
        </Link>
        <Creds />
      </div>
    )
  }
}
