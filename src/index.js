import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import ScrollTop from './components/OtherRoutes/ScrollTop'

import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

ReactDOM.render(
  <BrowserRouter>
    <ScrollTop>
      <App />
    </ScrollTop>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
