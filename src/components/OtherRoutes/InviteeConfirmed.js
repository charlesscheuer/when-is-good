import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'
import CalendarIcon from '../calendar/CalendarIcon'

class InviteeConfirmed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  componentWillMount(){
    if(this.props.data.location.data === undefined){
      this.setState({
        error: true
      })
    }
  }

  render() {
    return(
      !this.state.error ? (
      <div>
        <div className="App">
          <div className="bar">
            <div className="brand">
              <CalendarIcon />
              <div className="brand-title">
                <h1 className="brand-title-text">I'm Free FYI</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="sharing">
          <p>Great! Your meeting is booked</p>
          <p>Look for a meeting invite on your inbox and add it to your calendar</p>
        </div>
      </div>) : <Redirect to='/' />
    )
  }
}

export default InviteeConfirmed