import React from 'react';

const InviteeTopBar = props => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="create">
          <p>Confirm your availability</p>
          <div className="invitee_details">
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Name"
                id="inviteeName"
                onChange={e => props.inviteeDetailsHandler(e)}
                type="text"
              />
              <label className="create_emails_form_input_label">Name</label>
            </form>
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Email"
                id="inviteeEmail"
                onChange={e => props.inviteeDetailsHandler(e)}
                type="text"
              />
              <label className="create_emails_form_input_label">Email</label>
            </form>
            <form className="create_emails_form invitee_details_form">
              <input
                className="create_emails_form_input"
                placeholder="Phone number"
                id="inviteeNumber"
                onChange={e => props.inviteeDetailsHandler(e)}
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
