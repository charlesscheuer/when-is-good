import React, { Component } from 'react'

export default class EmailIncluded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPeople: 2,
      theirEmails: ['']
    }
  }

  upHandler = () => {
    let num = this.state.numPeople + 1
    this.state.theirEmails.push('')
    this.setState({ numPeople: num })
  }

  downHandler = () => {
    let num = this.state.numPeople - 1
    if (this.state.numPeople > 2) {
      this.state.theirEmails.splice(this.state.theirEmails.length - 1, 1)
      this.setState({ numPeople: num })
    }
  }

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
              value={this.state.numPeople}
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
                onChange={this.onEmailChange}
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
                <form className="create_emails_form">
                  <input
                    className="create_emails_form_input"
                    placeholder={'Person ' + (index + 2) + "'s email"}
                    id="email"
                    onChange={this.onEmailChange}
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
