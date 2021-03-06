import React from 'react';
import 'moment-timezone'
import moment from 'moment'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const InviteeTopBar = props => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="create">
          <p>Please select a time</p>
          <p>Available times are shown in green</p>
          <div className="create_timezone">
            <p className="create_timezone_label">
              What time zone would you like the times to be in?
            </p>
            <select
              className="create_timezone_selection"
              onChange={props.onInviteeTimezoneChange}
              value={props.inviteeTimezone}
            >
              {moment.tz.names().map((tz, index) => {
                return(
                <option className="create_timezone_selection-option" key={index} value={`${tz}`}>
                  {tz}
                </option>)
              })}
            </select>
          </div>
          <div className="invitee_details">
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Name"
                id="inviteeName"
                onChange={e => props.inviteeDetailsHandler(e, 'Email')}
                type="text"
              />
              <label className="create_emails_form_input_label">Name</label>
            </form>
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Email"
                id="inviteeEmail"
                onChange={e => {
                  if (emailRegex.test(String(e.target.value).toLowerCase())) {
                    props.inviteeDetailsHandler(e, 'Email');
                  } else {
                    props.inviteeDetailsHandler(e, 'Invalid Email');
                  }
                }}
                type="text"
              />
              <label className="create_emails_form_input_label">
                {props.emailLabel}
              </label>
            </form>
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Phone number"
                id="inviteeNumber"
                onChange={e => props.inviteeDetailsHandler(e, 'Email')}
                type="text"
              />
              <label className="create_emails_form_input_label">
                Phone number
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteeTopBar;
