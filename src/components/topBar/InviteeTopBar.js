import React from 'react'

const InviteeTopBar = (props) => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="create">
          <p>Confirm your availability</p>
          <form className="create_emails_form">
            <input
              className="create_emails_form_input"
              placeholder="What's it about?"
              id="event title"
              onChange={(e) => props.eventTitleHandler(e)}
              type="text"
            />
            <label
              className="create_emails_form_input_label"
            >
              What's it about?
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InviteeTopBar