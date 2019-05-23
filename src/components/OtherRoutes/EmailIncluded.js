import React, { Component } from 'react'

export default class EmailIncluded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theirEmails: props.theirEmails,
    }
  }

  upHandler = () => {
    let num = this.props.numPeople + 1
    this.state.theirEmails.push('')
    this.props.emailHandler({ numPeople: num })
  };

  downHandler = () => {
    let num = this.props.numPeople - 1
    if (this.props.numPeople > 2) {
      this.state.theirEmails.splice(this.state.theirEmails.length - 1, 1)
      this.props.emailHandler({ numPeople: num })
    }
  }

  yourEmailHandler = e => {
    this.props.emailHandler({ yourEmail: e.target.value })
  }

  theirEmailHandler = (e, index) => {
    let emailsCopy = [...this.state.theirEmails]
    emailsCopy.splice(index, 1, e.target.value)
    this.setState({ theirEmails: emailsCopy })
    this.props.emailHandler({ theirEmails: this.state.theirEmails })
  };

  render() {
    return (
      <div className="create">
        <div className="create_numPeople">
          <p className="create_numPoeople_Q">How many people are meeting?</p>
          <div className="create_numPeople_counter">
            <button
              onClick={this.downHandler}
              className="create_numPeople_counter_down"
            >
              &larr;
            </button>
            <input
              className="create_numPeople_counter_value"
              disabled
              type="text"
              value={this.props.numPeople}
            />
            <button
              onClick={this.upHandler}
              className="create_numPeople_counter_up"
            >
              &larr;
            </button>
          </div>
        </div>
        <div className="create_labels">
          <p className="create_labels_your">Your email:</p>
          <p className="create_labels_your">Their emails:</p>
        </div>
        <div className="create_emails">
          <div className="create_emails_yours">
            <form className="create_emails_form">
              <input
                className="create_emails_form_input"
                placeholder="Your email"
                id="email"
                onChange={this.yourEmailHandler}
                required
                type="text"
              />
              <label htmlFor="email" className="create_emails_form_input_label">
                Enter your email
              </label>
            </form>
          </div>
          <div className="create_emails_yours">
            {this.state.theirEmails.map((element, index) => {
              return (
                <form className="create_emails_form" key={index}>
                  <input
                    className="create_emails_form_input"
                    placeholder={'Person ' + (index + 2) + "'s email"}
                    id="email"
                    onChange={(e) => this.theirEmailHandler(e, index)}
                    required
                    type="text"
                  />
                  <label
                    htmlFor="email"
                    className="create_emails_form_input_label"
                  >
                    Enter email for person {index + 2}
                  </label>
                </form>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
