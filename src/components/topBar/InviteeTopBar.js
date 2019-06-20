import React from 'react';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const InviteeTopBar = props => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="create">
          <p>Confirm your availability</p>
          <div className="create_timezone">
            <p className="create_timezone_label">
              What time zone would you like the times to be in?
            </p>
            <select
              className="create_timezone_selection"
              onChange={props.onInviteeTimezoneChange}
              value={props.inviteeTimezone}
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
          <div className="invitee_details">
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Name"
                id="inviteeName"
                onChange={e => props.inviteeDetailsHandler(e, "Email")}
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
                  if(emailRegex.test(String(e.target.value).toLowerCase())) {
                    props.inviteeDetailsHandler(e, "Email")
                  } else {
                    props.inviteeDetailsHandler(e, "Invalid Email")
                  }
                }}
                type="text"
              />
              <label className="create_emails_form_input_label">{props.emailLabel}</label>
            </form>
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Phone number"
                id="inviteeNumber"
                onChange={e => props.inviteeDetailsHandler(e, "Email")}
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
    )
  }

export default InviteeTopBar
