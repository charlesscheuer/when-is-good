import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Loader from '../calendar/Loader'
import CalendarIcon from '../calendar/CalendarIcon'
import '../../SASS/main.scss'

class EventCreated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  componentWillMount(){
    setTimeout(() => {
      if(this.props.eventCode.length === 0){
        this.setState({
          error: true
        })
      }
    }, 8000)
  }

  render() {
    return(
      !this.state.error ? this.props.eventCode.length ? (
      <div>
        <div className="bar">
          <div className="brand">
            <CalendarIcon />
            <div className="brand-title">
              <h1 className="brand-title-text">I'm Free FYI</h1>
            </div>
          </div>
        </div>
        <div className="sharing">
          <p>You can share this URL with your invitees:</p>
          <a
            className="sharing_link"
            href={`http://localhost:3000/event/${this.props.eventCode}`}
          >{`https://imfree.fyi/event/${this.props.eventCode}`}</a>
        </div>
      </div>
      ) : (
        <Loader />
      ) : <Redirect to='/' />
    )
  }
}

export default EventCreated
